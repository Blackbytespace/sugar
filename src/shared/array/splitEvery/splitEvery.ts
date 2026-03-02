/**
 * @name                splitEvery
 * @namespace           shared.array
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Split an array every N items
 *
 * @param           {Array}           array               The array to split
 * @param           {Number}          every               Every how many items to split the array
 * @return          {Array}                               An array of arrays splited
 *
 * @snippet         splitEvery($1, $2)
 *
 * @example           js
 * import { splitEvery } from '@blackbyte/sugar/array';
 * splitEvery([1,2,3,4,5,6,7,8,9], 3);
 * // [[1,2,3],[4,5,6],[7,8,9]]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function splitEvery(array: any[], every: number): any[] {
  let i: number, j: number;
  const finalArray: any[] = [];
  for (i = 0, j = array.length; i < j; i += every) {
    finalArray.push(array.slice(i, i + every));
  }
  return finalArray;
}
