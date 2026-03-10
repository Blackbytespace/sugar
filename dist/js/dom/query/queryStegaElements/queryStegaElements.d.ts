/**
 * @name                queryStegaElements
 * @namespace           js.dom.query
 * @type                Function
 * @platform            js
 * @status              stable
 *
 * This function queries all elements (HTMLElement) that contain stega encoded metadata
 * either in their attributes or in their text content.
 * Stega encodes metadata as zero-width Unicode characters interleaved in strings.
 *
 * @param           {HTMLElement | Document}           [$root = document]             The root element to query stega elements in
 * @return          {TQueryStegaElementsResult[]}                                      Array of results containing stega encoded data
 *
 * @setting         {Boolean|String[]}         [attributes=true]         If true, check all attributes on the elements. If false, do not check attributes at all. If an array of string, check the corresponding attributes
 *
 * @snippet         queryStegaElements($1)
 *
 * @example         js
 * import { queryStegaElements } from '@blackbyte/sugar/dom';
 * const stegaElements = queryStegaElements();
 *
 * @since           1.0.0
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TQueryStegaElementsSettings = {
    attributes?: boolean | string[];
};
export type TQueryStegaElementsResult = {
    $elm: HTMLElement;
    attr?: string;
    stega: string;
    decode(): any;
};
export default function queryStegaElements($root?: HTMLElement | Document, settings?: Partial<TQueryStegaElementsSettings>): TQueryStegaElementsResult[];
