/**
 * @name                isCjs
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the current module system the code runs on "commonjs" module system.
 *
 * @return      {Boolean}           true if the current system is esm
 *
 * @snippet         isCjs()
 *
 * @example       js
 * import { isCjs } from '@blackbyte/sugar/is';
 * isCjs(); // => true
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isCjs(): boolean {
  try {
    return typeof module !== 'undefined';
  } catch (e) {
    return false;
  }
}
