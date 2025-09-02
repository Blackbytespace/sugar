/**
 * @name        isSafari
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        stable
 *
 * Detect if is safari
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return    {Boolean}    true if is safari, false if not
 *
 * @todo      tests
 *
 * @snippet         isSafari()
 *
 * @example 	js
 * import { isSafari } from '@blackbyte/sugar/is'
 * if (isSafari()) {
 *   // do something cool
 * }
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isSafari(ua = navigator.userAgent) {
    return ua.indexOf('Safari') != -1 && ua.indexOf('Chrome') == -1;
}
//# sourceMappingURL=isSafari.js.map