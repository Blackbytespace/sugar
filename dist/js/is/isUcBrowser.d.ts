/**
 * @name        isUcBrowser
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        stable
 *
 * Detect if is the UC stock browser that is running the page
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 *
 * @todo      tests
 *
 * @snippet         isUcBrowser()
 *
 * @example    js
 * import { isUcBrowser } from '@blackbyte/sugar/is'
 * if (isUcBrowser()) {
 *   // do something
 * }
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isUcBrowser(ua?: string): boolean;
