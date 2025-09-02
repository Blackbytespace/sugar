/**
 * @name                pickRandom
 * @namespace           shared.array
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Pick a random item in the passed array
 *
 * @param       {Array}         array       The array from which to pick a random item
 * @return      {Any}                       A random array item
 *
 * @snippet         pickRandom($1)
 *
 * @example         js
 * import { pickRandom } from '@blackbyte/sugar/array';
 * const array = ['hello','world'];
 * pickRandom(array); // => 'world'
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function pickRandom(array: any[], count?: number): any;
