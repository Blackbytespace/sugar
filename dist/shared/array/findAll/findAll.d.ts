/**
 * @name            findAll
 * @namespace       shared.array
 * @type            Function
 * @platform        node
 * @platform        js
 * @status          stable
 *
 * This function is a subset of the native "find" but it returns all the items that match the check function.
 * It returns an array of objects, each containing the:
 * - index: the position in the array
 * - value: the actual value at this position
 *
 * @param       {Array}         ar                  The array in which to search for an item
 * @param       {Function}      check               The check function to test if the element is the searched one
 * @return      {TFindAllResult[]|null}                An array of objects containing the index and value of the found items, or null if nothing found
 *
 * @snippet         findAll($1, (item: any) => {
 *    $2
 * })
 *
 * @example         js
 * import { findAll } from '@blackbyte/sugar/array';
 * findAll(['hello','world'], (item: any) => item === 'world')
 * [
 *     {
 *         index: 1,
 *         value: 'world'
 *     }
 * ]
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TFindAllResult = {
    index: number;
    value: any;
};
export default function findAll(ar: any[], check: (item: any) => boolean): TFindAllResult[];
