import uniqid from '../../string/uniqid.js';
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
 * @setting         {Boolean}              [once=true]                If true, each observed nodes will be handled only once even if they are removed and reinjected in the dom
 * @setting         {Function}             [afterFirst=undefined]     A function to call after the first node has been found
 * @setting         {Boolean}              [scopes=true]              If true, the selector
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
  scopes: boolean;
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
  let noScopeSelector,
    observer,
    canceled = false;

  const selectedNodes: HTMLElement[] = [];

  // extend settings
  const finalSettings: TQuerySelectorLiveSettings = {
    rootNode: document,
    once: true,
    afterFirst: undefined,
    scopes: true,
    firstOnly: false,
    attributes: [],
    disconnectedCallback: undefined,
    when: undefined,
    ...(settings ?? {}),
  };

  const innerQuerySelectorLive: TQuerySelectorLiveApi[] = [];

  // process selectors when scopes are true
  if (finalSettings.scopes) {
    noScopeSelector = selector
      .split(',')
      .map((sel) => {
        return `${sel.trim()}:not([s-scope] ${sel.trim()})`;
      })
      .join(',');
  }

  function isCanceled() {
    return selectedNodes.length && canceled && _isFirstLevel;
  }

  function cancel() {
    canceled = true;

    innerQuerySelectorLive.forEach((querySelectorLiveApi) => {
      querySelectorLiveApi.cancel();
    });
    observer?.disconnect();
  }

  function handleNode($node: HTMLElement): void {
    if (isCanceled()) {
      return;
    }

    // reset the "isDisconnected" flag
    if ((<any>$node)._isDisconnected) {
      delete (<any>$node)._isDisconnected;
    }

    // callback with our node
    cb?.($node, {
      cancel,
    });

    // handle firstOnly setting
    if (finalSettings.firstOnly) {
      cancel();
    }

    // mark our node as selected at least 1 time
    if (!selectedNodes.includes($node)) {
      selectedNodes.push($node);
    }

    // disconnected callback
    if (finalSettings.disconnectedCallback) {
      let mutationTimeout;
      if ($node.parentNode) {
        const disconnectObserver = new MutationObserver((mutations) => {
          clearTimeout(mutationTimeout);
          mutationTimeout = setTimeout(() => {
            if (!$node.parentNode && !(<any>$node)._isDisconnected) {
              (<any>$node)._isDisconnected = true;
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
  }

  async function processNode($node: HTMLElement, sel: string): Promise<void> {
    if (!$node.matches || isCanceled()) {
      return;
    }

    // if the node match and has not already been emitted
    if (
      $node.matches(selector) &&
      (!finalSettings.once || !selectedNodes.includes($node))
    ) {
      // handle the "when" setting
      if (finalSettings.when) {
        await when($node, [finalSettings.when]);
        if (isCanceled()) {
          return;
        }
        handleNode($node);
      } else {
        handleNode($node);
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

  if (
    finalSettings.scopes &&
    (finalSettings.rootNode === document ||
      // @ts-ignore
      !finalSettings.rootNode?.hasAttribute?.('s-scope'))
  ) {
    let isAfterCalledByScopeId = {};

    // search for scopes and handle nested nodes
    innerQuerySelectorLive.push(
      querySelectorLive(
        '[s-scope]',
        async ($scope) => {
          // get or generate a new id
          const scopeId = $scope.id || `s-scope-${uniqid()}`;
          if ($scope.id !== scopeId) {
            $scope.setAttribute('id', scopeId);
          }

          if (isCanceled()) {
            return;
          }

          await when($scope, ['nearViewport']);

          if (isCanceled()) {
            return;
          }

          innerQuerySelectorLive.push(
            querySelectorLive(
              selector,
              ($elm) => {
                processNode($elm, selector);
              },
              Object.assign({}, settings, {
                rootNode: $scope,
                scopes: false,
                afterFirst() {
                  if (
                    isAfterCalledByScopeId[scopeId] &&
                    // @ts-ignore
                    $scope._sQuerySelectorLiveScopeDirty
                  ) {
                    return;
                  }
                  // @ts-ignore
                  $scope._sQuerySelectorLiveScopeDirty = true;
                  isAfterCalledByScopeId[scopeId] = true;
                  $scope.classList.add('ready');
                  $scope.setAttribute('ready', 'true');
                },
              }),
              true,
            ),
          );
        },
        Object.assign({}, settings, {
          firstOnly: false,
          scopes: false,
        }),
        false,
      ),
    );
    // handle things not in a scope
    innerQuerySelectorLive.push(
      querySelectorLive(
        noScopeSelector,
        ($elm) => {
          // findAndProcess($scope, selector);
          processNode($elm, selector);
        },
        Object.assign({}, settings, {
          scopes: false,
        }),
        false,
      ),
    );
    // after first callback
    finalSettings.afterFirst?.();
  } else {
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
  }

  return {
    cancel,
  };
}
