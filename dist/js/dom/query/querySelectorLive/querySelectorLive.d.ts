import type { TWhenTrigger } from '@blackbyte/sugar/dom';
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
type TQuerySelectorLiveCallback = ($elm: HTMLElement, api: TQuerySelectorLiveApi) => void;
export default function querySelectorLive(selector: string, cb: TQuerySelectorLiveCallback, settings?: Partial<TQuerySelectorLiveSettings>): TQuerySelectorLiveApi;
export {};
