/**
 * @name            keysFirst
 * @namespace       shared.array
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * Make sure the passed array start with the passed keys
 *
 * @param    {Array}    array    The array to sort
 * @param    {Array}    keys    The keys to start the array with
 * @return    {Array}    The processed array
 *
 * @snippet         keysFirst($1, $2)
 *
 * @example    js
 * import { keysFirst } from '@blackbyte/sugar/array'
 * keysFirst(['a','b','d','g','c'], ['d','g'])
 * // ['d','g','a','b','c']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function keysFirst(array: any[], keys: any[]): any[];
