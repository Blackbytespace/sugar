/**
 * @name        isOpera
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        stable
 *
 * Detect if is opera
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return    {Boolean}    true if is opera, false if not
 *
 * @todo      tests
 *
 * @snippet         isOpera()
 *
 * @example 	js
 * import { isOpera } from '@blackbyte/sugar/is'
 * if ( isOpera()) {
 *   // do something cool
 * }
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isOpera(ua?: string): boolean;
