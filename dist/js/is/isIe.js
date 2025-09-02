/**
 * @name        isIe
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        stable
 *
 * Detect if is ie (internet explorer)
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return    {Boolean}    true if is ie, false if not
 *
 * @todo      tests
 *
 * @snippet         isIe()
 *
 * @example 	js
 * import { isIe } from '@blackbyte/sugar/is'
 * if (isIe()) {
 *   // do something cool
 * }
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isIe(ua = navigator.userAgent) {
    return ua.indexOf('MSIE') > -1;
}
//# sourceMappingURL=isIe.js.map