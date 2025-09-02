/**
 * @name            roundWithSign
 * @namespace       shared.math
 * @type            Function
 * @platform        node
 * @platform        js
 * @status          stable
 *
 * This function allows you to round a number by keeping his sign "+" or "-"
 *
 * @param       {Number}    number    The number to round
 * @return      {Number}     The rounded number
 *
 * @todo        tests
 *
 * @snippet         roundWithSign($1)
 *
 * @example         js
 * import { roundWithSign } from '@blackbyte/sugar/math';
 * roundWithSign(1.5); // => 1
 * roundWithSign(-1.5); // => -1
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function roundWithSign(number: number): number;
