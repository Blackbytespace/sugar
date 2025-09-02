/**
 * @name                    sort
 * @namespace               shared.object
 * @type                    Function
 * @platform                js
 * @platform                node
 * @status                  stable
 *
 * Sort an object properties the same way as the Array.sort do it.
 * The "a" and "b" argument passed to your sort function will have these properties:
 * - key: The key of the object
 * - value: The actual value of the object property
 *
 * @param                 {Object}                  object                The object to sort
 * @param                 {Function}                [sort=null]                  The sort function to use. If not specified, will sort the items by key alphabetically
 * @return                {Object}                                        The sorted object
 *
 * @todo      tests
 *
 * @snippet         sort($1, $2)
 * sort($1, (a, b) => {
 *      // a.key - a.value | b.key - b.value
 *      $2
 * })
 *
 * @example               js
 * import { sort } from '@blackbyte/sugar/object';
 * sort({
 *    coco: { weight: 10 },
 *    lolo: { weight: 2 },
 *    plop: { weight: 5 }
 * }, (a, b) => {
 *   return a.value.weight - b.value.weight;
 * });
 * // {
 * //   lolo: { weight: 2 },
 * //   plop: { weight: 5 },
 * //   coco: { weight: 10 }
 * // }
 *
 * @since       1.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function sort(object: any, sort?: (a: {
    key: string;
    value: any;
}, b: {
    key: string;
    value: any;
}) => number): any;
