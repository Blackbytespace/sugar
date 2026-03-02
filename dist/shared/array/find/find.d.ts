/**
 * @name            find
 * @namespace       shared.array
 * @type            Function
 * @platform        node
 * @platform        js
 * @status          stable
 *
 * This function is a subset of the native "find".
 * It returns the:
 * - index: the position in the array
 * - value: the actual value at this position
 *
 * @param       {Array}         ar                  The array in which to search for an item
 * @param       {Function}      check               The check function to test if the element is the searched one
 * @return      {TFindResult|null}                  An object containing the index and value of the finded item, or null if nothing found
 *
 * @snippet         find($1, (item: any) => {
 *    $2
 * })
 *
 * @example         js
 * import { find } from '@blackbyte/sugar/array';
 * find(['hello','world'], (item: any) => item === 'world')
 * {
 *     index: 1,
 *     value: 'world'
 * }
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TFindResult = {
    index: number;
    value: any;
};
export default function find(ar: any[], check: (item: any) => boolean): TFindResult | null;
