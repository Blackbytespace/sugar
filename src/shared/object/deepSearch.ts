import flatten from './flatten.js';
import __set from './set.js';

/**
 * @name                        deepSearch
 * @namespace                   shared.object
 * @type                        Function
 * @platform                    js
 * @platform                    node
 * @status                      stable
 *
 * This function take an object and a filter function that will be called for each properties of the object
 * and that will return true or false depending on the property you want to keep or not.
 *
 * @param               {Object}                object                The object to search in
 * @param               {Function}              filter                The filter function that take as parameter the property itself, and the property name
 * @return              {Object}                                      The searched object
 *
 * @todo      tests
 *
 * @example           js
 * import { deepSearch } from '@blackbyte/sugar/object';
 * deepSearch ({
 *    coco: 'hello',
 *    plop: true,
 *    sub: {
 *      property: 'world'
 *    }
 * }, ({key, item}) => typeof item === 'string');
 * // {
 * //   coco: 'hello',
 * //   sub: {
 * //     property: 'world'
 * //   }
 * // }
 *
 * @since         1.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TDeepSearchFilter = {
  (item: TDeepSearchItem): undefined | boolean;
};

export type TDeepSearchItem = {
  key: string;
  value: any;
};

export default function deepSearch(object: any, filter: TDeepSearchFilter) {
  // make sure the object is a copy
  object = JSON.parse(JSON.stringify(object));

  // flatten the object
  const flatObj = flatten(object);
  const res: any = {};

  // iterate over the flattened object
  for (let [key, value] of Object.entries(flatObj)) {
    if (filter({ key, value })) {
      __set(res, key, value);
    }
  }

  return res;
}
