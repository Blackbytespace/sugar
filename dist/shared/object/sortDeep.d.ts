/**
 * @name                                sortDeep
 * @namespace                           shared.object
 * @type                                Function
 * @platform                            js
 * @platform                            node
 * @status                              stable
 *
 * Sort an object properties the same way as the Array.sort do it but will do it recusrively to sort the object deeply.
 *
 * @param                 {Object}                  object                The object to sort
 * @param                 {Function}                sort                  The sort function to use
 * @return                {Object}                                        The sorted object
 *
 * @todo      tests
 *
 * @snippet         sortDeep($1, $2)
 * sortDeep($1, (a, b) => {
 *      $2
 * })
 *
 * @example               js
 * import { sortDeep } from '@blackbyte/sugar/object';
 * sortDeep({
 *    lolo: { weight: 2 },
 *    coco: { weight: 10 },
 *    plop: { weight: 5 },
 *    aha: {
 *      hello: 'world',
 *      coco: 'plop'
 *    }
 * }, (a, b) => {
 *    return a.key.localeCompare(b.key);
 * });
 * // {
 * //   aha: {
 * //      coco: 'plop',
 * //      hello: 'world'
 * //   }
 * //   coco: { weight: 10 }
 * //   lolo: { weight: 2 },
 * //   plop: { weight: 5 },
 * // }
 *
 * @since       1.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function sortDeep(object: any, sort: (a: {
    key: string;
    value: any;
}, b: {
    key: string;
    value: any;
}) => number): any;
