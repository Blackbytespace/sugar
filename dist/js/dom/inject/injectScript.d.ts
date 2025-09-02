/**
 * @name                injectScript
 * @namespace           js.dom.inject
 * @type                Function
 * @platform            js
 * @status              stable
 *
 * Append a script tag either to the head or the body
 *
 * @param    {String}    src    The script src to load
 * @return    {Promise}    A promise resolved with the script tag when it has fully loaded
 *
 * @snippet         injectScript($1)
 *
 * @todo      tests
 *
 * @example    js
 * import { injectScript } from '@blackbyte/sugar/dom'
 *  injectScript('dist/js/app.js')
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function injectScript(src: string, $parent?: HTMLElement): Promise<HTMLScriptElement>;
