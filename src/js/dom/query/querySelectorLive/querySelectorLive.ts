import type { TWhenTrigger } from '@blackbyte/sugar/dom';
import { when } from '@blackbyte/sugar/dom';

/**
 * @name            querySelectorLive
 * @namespace       js.dom.query
 * @type            Function
 * @platform        js
 * @status          stable
 * @async
 *
 * Observe the dom to get all the elements that matches a passed css selector at any point in time.
 * Be warned that this use the mutation observer API and will monitor all the document for new nodes. Make sure to use it
 * when you don't have the chance to use the custom elements API instead
 *
 * @feature         Specify what you want to select and get notified each time a node like this appears in the dom
 * @feature         Promise based API
 * @feature         Callback support
 * @feature         Monitor added nodes and existing nodes that have class and id attributes updated
 *
 * @param	      {String} 		                    selector 		      The css selector that we are interested in
 * @param 	    {Function} 		                  cb 				        The function to call with the newly added node
 * @param 	    {TQuerySelectorLiveSettings} 		[settings={}] 	  An optional settings object to specify things like the rootNode to monitor, etc...
 * @return      {SPromise<HTMLElement>}                           An SPromise instance on which to listen for nodes using the "node" event
 *
 * @setting         {HTMLElement}          [rootNode=document]                  The root node from where to observe childs
 * @setting         {Boolean}              [once=true]                          If true, each observed nodes will be handled only once even if they are removed and reinjected in the dom
 * @setting         {Function}             [afterFirst=null]               A function that will be called once the first scan is done
 * @setting         {Boolean}              [firstOnly=false]                    If true, the query will stop after the first matching node is found
 * @setting         {TWhenTrigger}         [when=null]                     An optional when trigger or array of triggers to wait for before calling the callback with the detected node
 * @setting         {Function}             [disconnectedCallback=null]     An optional callback function that will be called when a previously detected node is removed from the dom
 * @setting         {String[]}             [attributes=[]]                      An optional array of attributes to monitor for changes (in addition to class and id)
 *
 * @snippet         querySelectorLive($1, $2)
 * querySelectorLive($1, \$elm => {
 *      $2
 * });
 *
 * @example 	js
 * import { querySelectorLive } from '@blackbyte/sugar/dom'
 * const query = querySelectorLive('.my-cool-item', (node, api) => {
 * 	    // do something here with the detected node
 *      // call api.cancel if you want to stop listening for this selector
 *      api.cancel();
 * });
 * // cancel the query manually when needed
 * query.cancel();
 *
 * @since           1.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */

export type TQuerySelectorLiveSettings = {
  rootNode: HTMLElement | Document;
  once: boolean;
  afterFirst?: Function;
  firstOnly: boolean;
  when?: TWhenTrigger;
  disconnectedCallback?: ($elm: HTMLElement) => void;
  attributes: string[];
};

export type TQuerySelectorLiveApi = {
  cancel: Function;
};

type TQuerySelectorLiveCallback = (
  $elm: HTMLElement,
  api: TQuerySelectorLiveApi,
) => void;

export default function querySelectorLive(
  selector: string,
  cb: TQuerySelectorLiveCallback,
  settings?: Partial<TQuerySelectorLiveSettings>,
): TQuerySelectorLiveApi {
  // ─── State ────────────────────────────────────────────────────────────────
  let canceled = false;
  // Tracks nodes already dispatched (for once:true)
  const seen = new WeakSet<HTMLElement>();
  // Nodes currently awaiting a `when` promise
  const pending = new WeakSet<HTMLElement>();

  // ─── Settings ─────────────────────────────────────────────────────────────
  const finalSettings: TQuerySelectorLiveSettings = {
    rootNode: document,
    once: true,
    afterFirst: undefined,
    firstOnly: false,
    attributes: [],
    when: undefined,
    disconnectedCallback: undefined,
    ...(settings ?? {}),
  };

  // ─── API ──────────────────────────────────────────────────────────────────
  const api: TQuerySelectorLiveApi = { cancel };

  function cancel(): void {
    canceled = true;
    observer.disconnect();
  }

  // ─── Attribute list for the MutationObserver ──────────────────────────────
  // Always watch class and id (mutations on those can make selectors match).
  // Also auto-detect attribute names from bracketed parts of the selector, and
  // merge with any caller-supplied list.
  const attrSet = new Set<string>(['class', 'id', ...finalSettings.attributes]);
  for (const match of selector.matchAll(/\[([^\]=~|^$*]+)/g)) {
    attrSet.add(match[1].trim());
  }
  const attributeFilter = Array.from(attrSet);

  // ─── disconnectedCallback watcher ────────────────────────────────────────
  function watchDisconnect($elm: HTMLElement): void {
    if (!finalSettings.disconnectedCallback || !$elm.parentNode) return;
    const parentObserver = new MutationObserver(() => {
      if (!document.contains($elm)) {
        parentObserver.disconnect();
        finalSettings.disconnectedCallback!($elm);
      }
    });
    parentObserver.observe($elm.parentNode, { childList: true });
  }

  // ─── Core: handle one matching element ───────────────────────────────────
  async function handleElement($elm: HTMLElement): Promise<void> {
    if (canceled) return;

    // once:true — skip if we already fired for this node
    if (finalSettings.once && seen.has($elm)) return;

    // Avoid double-processing while a `when` promise is in flight
    if (pending.has($elm)) return;

    if (finalSettings.when) {
      pending.add($elm);
      try {
        await when($elm, finalSettings.when);
      } finally {
        pending.delete($elm);
      }
      // Re-check after the async gap
      if (canceled) return;
      if (finalSettings.once && seen.has($elm)) return;
    }

    if (finalSettings.once) seen.add($elm);

    cb($elm, api);

    watchDisconnect($elm);

    if (finalSettings.firstOnly) cancel();
  }

  // ─── Walk a subtree looking for matching nodes ────────────────────────────
  function scan(root: Node): void {
    if (canceled) return;

    // Check the root itself if it is an Element
    if (root instanceof HTMLElement && root.matches(selector)) {
      handleElement(root);
    }

    // Check descendants
    if ('querySelectorAll' in root) {
      (root as HTMLElement | Document)
        .querySelectorAll<HTMLElement>(selector)
        .forEach(($elm) => handleElement($elm));
    }
  }

  // ─── MutationObserver ─────────────────────────────────────────────────────
  const observerInit: MutationObserverInit = {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter,
  };

  const observer = new MutationObserver((mutations) => {
    if (canceled) return;
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => scan(node));
      } else if (mutation.type === 'attributes') {
        const target = mutation.target;
        if (target instanceof HTMLElement && target.matches(selector)) {
          handleElement(target);
        }
      }
    }
  });

  observer.observe(finalSettings.rootNode, observerInit);

  // ─── Initial scan of the current DOM ─────────────────────────────────────
  scan(finalSettings.rootNode as Node);

  // afterFirst fires synchronously after the initial scan is queued
  finalSettings.afterFirst?.();

  return api;
}
