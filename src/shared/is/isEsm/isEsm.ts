import __isCjs from './isCjs.js';

/**
 * @name                isEsm
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the current module system the code runs on "esm" module system.
 *
 * @return      {Boolean}           true if the current system is esm
 *
 * @snippet         isEsm()
 *
 * @todo            tests
 *
 * @example       js
 * import { isEsm } from '@blackbyte/sugar/is';
 * isEsm(); // => true
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isEsm(): boolean {
  return !__isCjs();
}
