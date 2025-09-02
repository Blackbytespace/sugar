/**
 * @name                isOdd
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if a number is odd or not
 *
 * @param    {Number}    value    The value to check
 * @return    {Boolean}    true if odd, false if not
 *
 * @todo      tests
 *
 * @snippet         isOdd($1)
 *
 * @example    js
 * import { isOdd } from '@blackbyte/sugar/is'
 * isOdd(1) // true
 * isOdd(2) // false
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isOdd(value: number): boolean;
