/**
 * @name            iframeAutoSize
 * @namespace       js.dom.iframe
 * @type            Function
 * @platform        js
 * @status          stable
 * @async
 *
 * This function allows you to resize an iframe to fit its content.
 *
 * @param           {HTMLElement}           obj           The iframe element to resize
 * @param           {TIFrameAutoSizeSettings}           [settings={}]           Some settings to configure your iframe auto size
 *
 * @setting        {Boolean}         [width=true]         Specify if you want to resize the width of the iframe
 * @setting        {Boolean}         [height=true]        Specify if you want to resize the height of the iframe
 *
 * @snippet         iframeAutoSize($1)
 * iframeAutoSize($1, $2);
 *
 * @todo      tests
 *
 * @example  	js
 * import { iframeAutoSize } from '@blackbyte/sugar/dom';
 * iframeAutoSize($1, $2);
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TIFrameAutoSizeSettings = {
    width?: boolean;
    height?: boolean;
};
export default function iframeAutoSize($iframe: HTMLIFrameElement, settings?: TIFrameAutoSizeSettings): void;
