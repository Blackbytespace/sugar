/**
 * @name            reloadStylesheets
 * @namespace       js.dom.css
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * This function just loop on each "link" tags that point to some css files
 * and reload them by adding a "queryString" with the timestamp in it
 * to prevent caching
 *
 * @param       {HTMLElement}           [$root=document]            The root element in which to reload the stylesheets
 *
 * @snippet         reloadStylesheets()
 *
 * @example         js
 * import { __reloeadStylesheets } from '@blackbyte/sugar/dom';
 * reloadStylesheets();
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TReloadStylesheetsSettings = {
    $root: HTMLElement | Document;
};
export default function reloadStylesheets(settings?: Partial<TReloadStylesheetsSettings>): void;
