import isClassInstance from '../is/isClassInstance.js';
import isPlainObject from '../is/isPlainObject.js';
import clone from './clone.js';

/**
 * @name                deepMap
 * @namespace           shared.object
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * This function is the same as the "map" one. The only difference is that this one goes deep into the object
 *
 * @param         {Object}        object          The object you want to map through
 * @param         {Function}      processor       The processor function that take as parameter the actual property value, the current property name and the full dotted path to the current property
 * @param         {Object}        [settings={}]     An object of settings to configure your deepMap process:
 *
 * @setting    {Boolean}              [classInstances=false]            Specify if you want the objects to be processed the same as other values
 * @setting         {Boolean}       [array=true]                    Specify if we want to process also arrays or not
 * @setting         {Boolean}       [clone=false]          Specify if you want to clone the object passed before cleaning it
 * @setting         {Boolean}      [privateProps=true]     Specify if you want to clean also the private properties that starts with "_"
 *
 * @todo      tests
 *
 * @snippet         deepMap($1, $2)
 * deepMap($1, ({object, prop, value, path}) => {
 *      $2
 * })
 *
 * @example       js
 * import { deepMap } from '@blackbyte/sugar/object';
 * deepMap({
 *    hello: 'world'
 * }, ({object, prop, value, path}) => {
 *    return '~ ' + value;
 * });
 *
 * @since       1.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TDeepMapSettings = {
  classInstances?: boolean;
  array?: boolean;
  clone?: boolean;
  privateProps?: boolean;
};

export default function deepMap(
  objectOrArray: any,
  processor?: Function,
  settings?: TDeepMapSettings,
  _path = [],
): any {
  settings = {
    classInstances: false,
    array: true,
    clone: false,
    privateProps: true,
    ...settings,
  };

  const isArray = Array.isArray(objectOrArray);

  let newObject = isArray
    ? []
    : settings?.clone
    ? clone(objectOrArray, { deep: true })
    : objectOrArray;

  Object.keys(objectOrArray).forEach((prop) => {
    if (!settings?.privateProps && prop.match(/^_/)) return;

    if (
      isPlainObject(objectOrArray[prop]) ||
      (isClassInstance(objectOrArray[prop]) && settings?.classInstances) ||
      (Array.isArray(objectOrArray[prop]) && settings?.array)
    ) {
      const res = deepMap(
        objectOrArray[prop],
        processor,
        {
          ...settings,
          clone: false,
        },
        // @ts-ignore
        [..._path, prop],
      );

      if (isArray) {
        newObject.push(res);
      } else {
        if (prop === '...' && isPlainObject(res)) {
          newObject = {
            ...newObject,
            ...res,
          };
        } else {
          newObject[prop] = res;
        }
      }
      return;
    }

    const res = processor?.({
      object: objectOrArray,
      prop,
      value: objectOrArray[prop],
      path: [..._path, prop].join('.'),
    });
    if (res === -1) {
      delete newObject[prop];
      return;
    }
    if (isArray) {
      newObject.push(res);
    } else {
      if (prop === '...' && isPlainObject(res)) {
        // console.log('DEFEF', res);
        newObject = {
          ...newObject,
          ...res,
        };
      } else {
        newObject[prop] = res;
      }
    }
  });
  return newObject;
}
