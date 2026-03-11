import type { TWhenTrigger } from '@blackbyte/sugar/dom';
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
type TQueryStegaElementsLiveCallback = (element: TQueryStegaElementsLiveElement, api: TQueryStegaElementsLiveApi) => void;
export default function queryStegaElementsLive(cb: TQueryStegaElementsLiveCallback, settings?: Partial<TQueryStegaElementsLiveSettings>): TQueryStegaElementsLiveApi;
export {};
