/**
 * @name        isChrome
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        stable
 *
 * Detect if is chrome
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return    {Boolean}    true if is chrome, false if not
 *
 * @todo      tests
 *
 * @snippet         isChrome()
 *
 * @example 	js
 * import { isChrome } from '@blackbyte/sugar/is'
 * if ( isChrome()) {
 *   // do something cool
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isChrome(ua = navigator.userAgent) {
    return ua.indexOf('Chrome') > -1;
}
//# sourceMappingURL=isChrome.js.map