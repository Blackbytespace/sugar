/**
 * @name                keysLast
 * @namespace           shared.array
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Make sure the passed array ends with the passed keys
 *
 * @param    {Array}    array    The array to process
 * @param    {Array}    keys    The keys to end the array with
 * @return    {Array}    The processed array
 *
 * @snippet         keysLast($1, $2)
 *
 * @example    js
 * import { keysLast } from '@blackbyte/sugar/array'
 * keysLast(['a','b','d','g','c'], ['d','g'])
 * // ['a','b','c','d','g']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function keysLast(array: any[], keys: any[]): any[];
