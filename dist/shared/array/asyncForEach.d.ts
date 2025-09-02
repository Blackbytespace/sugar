/**
 * @name                    asyncForEach
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
 * @snippet         asyncForEach($1, $2)
 * await asyncForEach($1, (item, idx) => {
 *      $2
 * });
 *
 * @example         js
 * import { asyncForEach } from '@blackbyte/sugar/array';
 * const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
 * asyncForEach([0,1,2,3], async (item) => {
 *    await waitWor(50);
 *    console.log(item);
 * });
 * // 0
 * // 1
 * // 2
 * // 3
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TAsyncForEach = {
    (value: any, index: number, array: any[]): void;
};
export default function asyncForEach(array: any[], asyncFn: TAsyncForEach): Promise<void>;
