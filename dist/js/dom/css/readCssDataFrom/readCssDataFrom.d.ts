/**
 * @name                readCssDataFrom
 * @namespace           js.dom.css
 * @type                Function
 * @platform            js
 * @status              stable
 *
 * This function allows you to read some JSON data from the ":before|:after" pseudo class in the "content" property.
 *
 * @param       {HTMLElement}           [$elm=document.body]        The element from which to get data
 *
 * @snippet         readCssDataFrom(document.body)
 *
 * @example         js
 * import { readCssDataFrom } from '@blackbyte/sugar/dom';
 * const data = readCssDataFrom();
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TReadCssDaraSettings = {};
export default function readCssDataFrom($elm: HTMLElement, settings?: Partial<TReadCssDaraSettings>): void;
