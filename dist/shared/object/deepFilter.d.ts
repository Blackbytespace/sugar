/**
 * @name                        deepFilter
 * @namespace                   shared.object
 * @type                        Function
 * @platform                    js
 * @platform                    node
 * @status                      stable
 *
 * Allow to filter an object using a function and this through all of the object structure. It works the same as the filter method on the Array object type.
 * The passed filter function will have as parameter each object properties and must return true or false depending if you want the
 * passed property in the filtered object
 *
 * @param               {Object}                object                The object to filter
 * @param               {Function}              filter                The filter function that take as parameter the property itself, and the property name
 * @return              {Object}                                      The filtered object
 *
 * @setting             {Boolean}           [clone=true]            Specify if you want to clone the object before filter it
 *
 * @todo      tests
 *
 * @example           js
 * import { deepFilter } from '@blackbyte/sugar/object';
 * deepFilter ({
 *    coco: 'hello',
 *    plop: true,
 *    sub: {
 *      property: 'world'
 *    }
 * }, ({key, value}) => typeof item === 'string');
 * // {
 * //   coco: 'hello'
 * //   sub: {
 * //     property: 'world'
 * //   }
 * // }
 *
 * @since         1.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TDeepFilterSettings = {
    clone: boolean;
};
export type TDeepFilterFilter = {
    (item: TDeepFilterItem): undefined | boolean;
};
export type TDeepFilterItem = {
    key: string;
    value: any;
    isObject: boolean;
};
export default function deepFilter(object: any, filter: TDeepFilterFilter, settings?: Partial<TDeepFilterSettings>): any;
