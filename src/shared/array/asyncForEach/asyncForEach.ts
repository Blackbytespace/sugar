/**
 * @name                    forEachAsync
 * @namespace               shared.array
 * @type                    Function
 * @platform                js
 * @platform                node
 * @status                  stable
 *
 * Allow to make some async foreach on your arrays
 *
 * @param         {Array}             array             The array to loop on
 * @param         {Function}          asyncFn           The async function to call on each items
 *
 * @snippet         forEachAsync($1, $2)
 * await forEachAsync($1, async (item, idx) => {
 *      $2
 * });
 *
 * @example         js
 * import { forEachAsync } from '@blackbyte/sugar/array';
 * import { sleep } from '@blackbyte/sugar/function';
 * forEachAsync([0,1,2,3], async (item) => {
 *    await sleep(50);
 *    console.log(item);
 * });
 * // 0
 * // 1
 * // 2
 * // 3
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TForEachAsync = {
  (value: any, index: number, array: any[]): void;
};
export default async function forEachAsync(
  array: any[],
  asyncFn: TForEachAsync,
): Promise<void> {
  return new Promise(async (resolve) => {
    for (let index = 0; index < array.length; index++) {
      await asyncFn(array[index], index, array);
    }
    resolve();
  });
}
