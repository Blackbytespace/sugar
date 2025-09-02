/**
 * @name                injectStyle
 * @namespace           js.dom.inject
 * @type                Function
 * @platform            js
 * @status              stable
 *
 * Inject a passed style string in the DOM
 *
 * @param         {String}          style         The style to inject in DOM
 * @param           {Partial<TInjectStyleSettings>}     [settings=null]         Some settings to configure your injection
 * @return                          {HTMLStyleElement}      The injected HTMLStyleElement node
 *
 * @setting         {String}        id          An id for the injected style tag
 * @setting         {HTMLElement}   [rootNode=undefined]        A node in which to inject the style
 *
 * @snippet         injectStyle($1)
 *
 * @todo        tests
 *
 * @example       js
 * import { injectStyle } from '@blackbyte/sugar/dom';
 *  injectStyle('a { color: red; }');
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TInjectStyleSettings = {
    id: string;
    rootNode: HTMLElement;
};
export default function injectStyle(style: any, settings?: Partial<TInjectStyleSettings>): HTMLStyleElement | undefined;
