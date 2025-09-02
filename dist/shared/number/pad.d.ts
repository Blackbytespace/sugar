/**
 * @name                pad
 * @namespace           shared.number
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Pad a number n of x 0 or another passed character
 *
 * @param    {Number}    number    The number to pad
 * @param    {Integer}    width    The width of pad to apply
 * @param    {String}    [character="0"]    The character to use
 *
 * @todo      tests
 *
 * @snippet         pad($1, $2)
 *
 * @example    js
 * import { pad } from '@blackbyte/sugar/number'
 * pad(123, 4) // 0123
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function pad(number: number, width: number, character?: string): string;
