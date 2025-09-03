import type { TWhenTrigger } from '../when/when.js';
import when from '../when/when.js';

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
 * @feature         Monitor added nodes and existing nodes that have class and id attributes updated
 *
 * @param	      {String} 		                    selector 		          The css selector that we are interested in
 * @param 	    {Function} 		                  cb 				            The function to call with the newly added node
 * @param 	    {TQuerySelectorLiveSettings} 		[settings={}] 	      An optional settings object to specify things like the rootNode to monitor, etc...
 * @return      {TQuerySelectorLiveApi}                               An object with a cancel method to stop the query listening
 *
 * @setting         {HTMLElement}          [rootNode=document]        The root node from where to observe childs
 * @setting         {Function}             [afterFirst=undefined]     A function to call after the first node has been found
 * @setting         {Boolean}              [firstOnly=false]          If true, the query will stop after the first node has been found
 * @setting         {TWhenTrigger}         [when=undefined]           A when trigger to wait for before executing the callback. Can be direct, inViewport, nearViewport, enterViewport, outOfViewport, interact, visible, domReady, stylesheetsReady or animationEnd
 * @setting         {Function}             [disconnectedCallback=undefined]         A function to call when a node is disconnected from the dom
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
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TQuerySelectorLiveSettings = {
  rootNode: HTMLElement | Document;
  once: boolean;
  afterFirst?: Function;
  firstOnly: boolean;
  when?: TWhenTrigger<string>;
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
  _isFirstLevel = true,
): TQuerySelectorLiveApi {
  let observer,
    canceled = false;

  console.trace('SS', selector);

  const matchedNodes: WeakMap<HTMLElement, boolean> = new WeakMap();

  // extend settings
  const finalSettings: TQuerySelectorLiveSettings = {
    rootNode: document,
    once: true,
    afterFirst: undefined,
    firstOnly: false,
    attributes: [],
    disconnectedCallback: undefined,
    when: undefined,
    ...(settings ?? {}),
  };

  const innerQuerySelectorLive: TQuerySelectorLiveApi[] = [];

  function isCanceled() {
    return canceled && _isFirstLevel;
  }

  function cancel() {
    canceled = true;

    innerQuerySelectorLive.forEach((querySelectorLiveApi) => {
      querySelectorLiveApi.cancel();
    });
    observer?.disconnect();
  }

  async function processNode($node: HTMLElement, sel: string): Promise<void> {
    // if is canceled
    if (isCanceled()) {
      return;
    }

    // if the process has been canceled or the node is not an element
    if (!$node.matches || isCanceled()) {
      return;
    }

    // if already matched and "once" setting is true
    if (finalSettings.once && matchedNodes.has($node)) {
      return;
    }

    // if not match
    if (!$node.matches(selector)) {
      return;
    }

    // track matched nodes
    matchedNodes.set($node, true);

    // when
    if (finalSettings.when) {
      await when($node, [finalSettings.when]);
      if (isCanceled()) {
        return;
      }
    }

    // handle node
    // callback with our node
    cb?.($node, {
      cancel,
    });

    // handle firstOnly setting
    if (finalSettings.firstOnly) {
      cancel();
    }

    // disconnected callback
    if (finalSettings.disconnectedCallback) {
      let mutationTimeout: any;
      if ($node.parentNode) {
        const disconnectObserver = new MutationObserver((mutations) => {
          clearTimeout(mutationTimeout);
          mutationTimeout = setTimeout(() => {
            if (!$node.parentNode) {
              finalSettings.disconnectedCallback?.($node);
              disconnectObserver.disconnect();
            }
          });
        });
        disconnectObserver.observe($node.parentNode, {
          childList: true,
        });
      }
    }

    // search inside our node
    findAndProcess($node, sel);
  }

  function findAndProcess($root: HTMLElement, sel: string) {
    if (!$root.querySelectorAll || isCanceled()) {
      return;
    }

    const nodes = Array.from($root?.querySelectorAll(sel));
    nodes.forEach(($node) => {
      processNode($node as HTMLElement, sel);
    });
  }

  observer = new MutationObserver((mutations, obs) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName) {
        processNode(mutation.target as HTMLElement, selector);
      }
      if (mutation.addedNodes) {
        mutation.addedNodes.forEach(($node) => {
          processNode($node as HTMLElement, selector);
        });
      }
    });
  });

  let observeSettings: MutationObserverInit = {
    childList: true,
    subtree: true,
  };

  selector
    .split(',')
    .map((l) => l.trim())
    .forEach((sel) => {
      const attrMatches = sel.match(/\[[^\]]+\]/gm);
      if (attrMatches?.length) {
        attrMatches.forEach((attrStr) => {
          const attrName = attrStr
            .split('=')[0]
            .replace(/^\[/, '')
            .replace(/\]$/, '');
          if (!finalSettings.attributes?.includes(attrName)) {
            finalSettings.attributes?.push(attrName);
          }
        });
      }
    });

  if (finalSettings.attributes?.length) {
    observeSettings = {
      ...observeSettings,
      attributes: finalSettings.attributes?.length ? true : false,
      attributeFilter: finalSettings.attributes.length
        ? finalSettings.attributes
        : undefined,
    };
  }

  observer.observe(finalSettings.rootNode, observeSettings);

  // first query
  findAndProcess(finalSettings.rootNode as HTMLElement, selector);
  // after first callback
  finalSettings.afterFirst?.();

  return {
    cancel,
  };
}
