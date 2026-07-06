import { stega } from '@blackbyte/sugar/crypto';
import type { TWhenTrigger } from '@blackbyte/sugar/dom';
import { when } from '@blackbyte/sugar/dom';
import { VERCEL_STEGA_REGEX, vercelStegaClean } from '@vercel/stega';

/**
 * @name                queryStegaElementsLive
 * @namespace           js.dom.query
 * @type                Function
 * @platform            js
 * @status              stable
 *
 * Monitor the specified rootNode element and all its descendants for stega encoded
 * metadata, either in attributes or text content. When detected, calls the
 * provided callback with the result. Uses a MutationObserver to react to DOM
 * changes in real time.
 *
 * @feature         Detects stega data in text nodes and attributes
 * @feature         Reacts to DOM mutations in real time via MutationObserver
 * @feature         Supports the "once" flag to call the callback only once per element
 * @feature         Supports a "when" trigger to defer the callback until a condition is met
 * @feature         Supports a disconnectedCallback when a detected element is cleand
 * @feature         Supports attribute filtering via the "attributes" setting
 *
 * @param           {TQueryStegaElementsLiveCallback}               cb                  The callback called with each detected stega element
 * @param           {Partial<TQueryStegaElementsLiveSettings>}      [settings={}]       Optional settings
 * @return          {TQueryStegaElementsLiveApi}                                        API object with a cancel() method
 *
 * @setting         {HTMLElement | Document}    [rootNode=document]             The root node to observe
 * @setting         {Boolean}                  [once=true]                      Only call the callback once per element
 * @setting         {TWhenTrigger}             [when=undefined]                 Call the callback only when the trigger is fulfilled
 * @setting         {Function}                 [disconnectedCallback=undefined] Called when a detected element is cleand from the DOM
 * @setting         {Boolean | String[]}       [attributes=true]                If true, check all attributes. If false, skip attributes. If string[], check only listed attributes.
 * @setting         {Boolean}                  [clean=true]                    If true, strip the stega payload from the DOM after detection
 *
 * @snippetp         queryStegaElementsLive($1)
 * queryStegaElementsLive(element => {
 *      $1
 * });
 *
 * @example         js
 * import { queryStegaElementsLive } from '@blackbyte/sugar/dom';
 * const query = queryStegaElementsLive(element => {
 *     console.log(element.$elm, element.decode());
 * });
 * // stop observing when needed
 * query.cancel();
 *
 * @see             https://www.npmjs.com/package/@vercel/stega
 * @since           1.0.0
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TQueryStegaElementsLiveElement = {
  $elm: HTMLElement;
  attr?: string;
  stega: string;
  data: any;
};

export type TQueryStegaElementsLiveSettings = {
  rootNode: HTMLElement | Document;
  once: boolean;
  clean: boolean;
  when?: TWhenTrigger;
  disconnectedCallback?: (element: TQueryStegaElementsLiveElement) => void;
  attributes: boolean | string[];
};

export type TQueryStegaElementsLiveApi = {
  cancel: Function;
};

type TQueryStegaElementsLiveCallback = (
  element: TQueryStegaElementsLiveElement,
  api: TQueryStegaElementsLiveApi,
) => void;

function extractStega(value: string): string | null {
  const matches = value.match(VERCEL_STEGA_REGEX);
  return matches ? matches.join('') : null;
}

export default function queryStegaElementsLive(
  cb: TQueryStegaElementsLiveCallback,
  settings?: Partial<TQueryStegaElementsLiveSettings>,
): TQueryStegaElementsLiveApi {
  // ─── State ────────────────────────────────────────────────────────────────
  let canceled = false;
  // Tracks already-dispatched elements, keyed by the DOM element itself. An
  // element is marked as seen the first time it is taken, regardless of whether
  // the stega data came from its text content or an attribute. A WeakSet lets
  // entries be garbage collected once the element is removed from the DOM.
  const seen = new WeakSet<HTMLElement>();

  function hasSeen($elm: HTMLElement): boolean {
    return seen.has($elm);
  }

  function markSeen($elm: HTMLElement): void {
    seen.add($elm);
  }

  // ─── Settings ─────────────────────────────────────────────────────────────
  const finalSettings: TQueryStegaElementsLiveSettings = {
    rootNode: document,
    once: true,
    clean: true,
    attributes: true,
    when: undefined,
    disconnectedCallback: undefined,
    ...(settings ?? {}),
  };

  // ─── API ──────────────────────────────────────────────────────────────────
  const api: TQueryStegaElementsLiveApi = { cancel };

  function cancel(): void {
    canceled = true;
    observer.disconnect();
    disconnectObserver.disconnect();
  }

  // ─── disconnectedCallback watcher ─────────────────────────────────────────
  // Maps each tracked element to its stega result so we can fire the callback
  // when any ancestor (not just the direct parent) is removed from the DOM.
  const trackedElements = new Map<
    HTMLElement,
    TQueryStegaElementsLiveElement
  >();

  const disconnectObserver = new MutationObserver((mutations) => {
    if (!finalSettings.disconnectedCallback || trackedElements.size === 0)
      return;
    for (const mutation of mutations) {
      if (mutation.type !== 'childList') continue;
      mutation.removedNodes.forEach((removed) => {
        // Check if the removed node itself, or any of its descendants, is tracked
        trackedElements.forEach((result, $elm) => {
          if (
            removed === $elm ||
            (removed instanceof Element && removed.contains($elm))
          ) {
            trackedElements.delete($elm);
            finalSettings.disconnectedCallback!(result);
          }
        });
      });
    }
  });

  disconnectObserver.observe(finalSettings.rootNode, {
    childList: true,
    subtree: true,
  });

  function watchDisconnect(
    $elm: HTMLElement,
    result: TQueryStegaElementsLiveElement,
  ): void {
    if (!finalSettings.disconnectedCallback) return;
    trackedElements.set($elm, result);
  }

  // ─── Core: handle one stega result ────────────────────────────────────────
  async function handleResult(
    result: TQueryStegaElementsLiveElement,
  ): Promise<void> {
    if (canceled) return;

    if (finalSettings.once && hasSeen(result.$elm)) return;

    // Reserve the element synchronously, before any await, so concurrent scans
    // of the same element (childList + attributes + characterData mutations
    // firing for the same node) can't dispatch the callback more than once.
    if (finalSettings.once) markSeen(result.$elm);

    // Strip the stega payload right away, as soon as it is detected, instead of
    // waiting for the (possibly deferred) `when` trigger to fulfill. Otherwise
    // the payload lingers in the DOM and gets re-detected every time the
    // framework re-renders / patches the node, calling the callback again. The
    // decoded data is already captured in `result`, so the callback still
    // receives it below.
    if (finalSettings.clean) cleanStega(result);

    if (finalSettings.when) {
      await when(result.$elm, finalSettings.when);
      if (canceled) return;
    }

    cb(result, api);

    watchDisconnect(result.$elm, result);
  }

  // ─── Strip the stega payload from a detected element ──────────────────────
  function cleanStega(result: TQueryStegaElementsLiveElement): void {
    // Pause the observer so stripping zero-width chars doesn't trigger a re-scan
    observer.disconnect();
    if (result.attr) {
      result.$elm.setAttribute(
        result.attr,
        vercelStegaClean(result.$elm.getAttribute(result.attr) ?? ''),
      );
    } else {
      for (const node of Array.from(result.$elm.childNodes)) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent) {
          node.textContent = vercelStegaClean(node.textContent);
        }
      }
    }
    observer.observe(finalSettings.rootNode, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });
  }

  // ─── Scan one element for stega data ──────────────────────────────────────
  function scanElement($elm: HTMLElement): void {
    if (canceled) return;

    // Check text nodes
    for (const node of Array.from($elm.childNodes)) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent) {
        const raw = extractStega(node.textContent);
        if (raw) {
          const decoded = stega.decrypt(node.textContent);
          if (decoded == null) continue;
          handleResult({
            $elm,
            stega: raw,
            data: decoded,
          });
        }
      }
    }

    // Check attributes
    if (finalSettings.attributes !== false) {
      for (const attr of Array.from($elm.attributes)) {
        if (
          Array.isArray(finalSettings.attributes) &&
          !finalSettings.attributes.includes(attr.name)
        ) {
          continue;
        }
        const raw = extractStega(attr.value);
        if (raw) {
          const decoded = stega.decrypt(attr.value);
          if (decoded == null) continue;
          handleResult({
            $elm,
            attr: attr.name,
            stega: raw,
            data: decoded,
          });
        }
      }
    }
  }

  // ─── Walk a subtree ────────────────────────────────────────────────────────
  function scan(root: Node): void {
    if (canceled) return;
    if (root instanceof HTMLElement) scanElement(root);
    if ('querySelectorAll' in root) {
      (root as HTMLElement | Document)
        .querySelectorAll<HTMLElement>('*')
        .forEach(($elm) => scanElement($elm));
    }
  }

  // ─── MutationObserver ─────────────────────────────────────────────────────
  const observer = new MutationObserver((mutations) => {
    if (canceled) return;
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => scan(node));
      } else if (
        mutation.type === 'attributes' ||
        mutation.type === 'characterData'
      ) {
        const target = mutation.target;
        if (target instanceof HTMLElement) {
          scanElement(target);
        } else if (target.nodeType === Node.TEXT_NODE && target.parentElement) {
          scanElement(target.parentElement);
        }
      }
    }
  });

  observer.observe(finalSettings.rootNode, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true,
  });

  // ─── Initial scan ─────────────────────────────────────────────────────────
  scan(finalSettings.rootNode as Node);

  return api;
}
