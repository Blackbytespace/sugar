import isPlainObject from '../is/isPlainObject.js';

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

function processObj(object: any, filter: TDeepFilterFilter, settings): any {
  const newObj = {},
    keys = Object.keys(object);

  // loop on the object keys
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = object[key];

    // pass the property in the filter function
    const res = filter({
      key,
      value,
      isObject: isPlainObject(value),
    });

    // true mean: we keep this totally
    if (res === true) {
      if (isPlainObject(value)) {
        newObj[key] = settings.clone
          ? processObj(Object.assign({}, value), filter, settings)
          : processObj(value, filter, settings);
      } else {
        newObj[key] = value;
      }
    } else if (res === undefined) {
      if (isPlainObject(value)) {
        newObj[key] = settings.clone
          ? processObj(Object.assign({}, value), filter, settings)
          : processObj(value, filter, settings);
      } else {
        newObj[key] = value;
      }
    }
    // false mean: we do not keep this
    else if (res === false) {
      continue;
    }
  }

  return newObj;
}

export default function deepFilter(
  object: any,
  filter: TDeepFilterFilter,
  settings?: Partial<TDeepFilterSettings>,
) {
  settings = {
    clone: true,
    ...(settings ?? {}),
  };
  return processObj(
    settings.clone ? Object.assign({}, object) : object,
    filter,
    settings,
  );
}
