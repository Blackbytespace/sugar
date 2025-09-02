/**
 * @name                        filterObject
 * @namespace                   shared.object
 * @type                        Function
 * @platform                    js
 * @platform                    node
 * @status                      stable
 *
 * Allow to filter an object using a function. It works the same as the filter method on the Array object type.
 * The passed filter function will have as parameter each object properties and must return true or false depending if you want the
 * passed property in the filtered object
 *
 * @param               {Object}                object                The object to filter
 * @param               {Function}              filter                The filter function that take as parameter the property itself, and the property name
 * @return              {Object}                                      The filtered object
 *
 * @todo      tests
 *
 * @snippet         filterObject($1, $2)
 * filterObject
 *
 * @example           js
 * import { filterObject } from '@blackbyte/sugar/object';
 * filterObject({
 *    coco: 'hello',
 *    plop: true
 * }, (key, item) => typeof item === 'string');
 * // { coco: 'hello' }
 *
 * @since         1.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function filterObject(object: any, filter: (key: string, value: any) => boolean): any;
