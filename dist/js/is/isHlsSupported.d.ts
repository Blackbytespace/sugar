/**
 * @name          isHlsSupported
 * @namespace     js.is
 * @type          Function
 * @platform      js
 * @status        stable
 *
 * Check if the HLS format is supported by the browser
 *
 * @return      {Boolean}       true if supported, false if not
 *
 * @snippet         isHlsSupported($1)
 *
 * @todo      tests
 *
 * @example    js
 * import { isHlsSupported } from '@blackbyte/sugar/id'
 * if (!isHlsSupported()) {
 *   // do something
 * }
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isHlsSupported(): boolean;
