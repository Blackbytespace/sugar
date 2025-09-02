import isPlainObject from '../is/isPlainObject.js';

/**
 * @name                    diff
 * @namespace               shared.object
 * @type                    Function
 * @platform                js
 * @platform                node
 * @status                  stable
 *
 * This function take two objects and return an object that contains only what has been changed between the two.
 * This function is a simple wrapper around the nice object-diff package from Thomas Jensen that you can find here: https://www.npmjs.com/package/object-diff
 *
 * @param         {Object}          object1            The first object used for the diff process
 * @param         {Object}          object2            The second object used for the diff process
 * @param         {Object}          [settings={}]      An object of settings to configure the diff process:
 * - deep (true) {Boolean}: Specify if you want a deep diff or a simple one level diff
 * - added (true) {Boolean}: Specify if you want to include the props that does not exist on the object1 but exists on the object2
 * - deleted (false) {Boolean}: Specify if you want to include the props that exists on the object1 but no more on the object2
 * - equals (false) {Boolean}: Specify if you want to include the props that are equals from the object1 to the object2
 * - emptyObject (false) {Boolean}: Specify if you want to keep the empty objects in the resulting one
 * - updated (true) {Boolean}: Specify if you want to include the updated values
 * @return        {Object}                             The object that contains only the differences between the two
 *
 * @todo      tests
 *
 * @snippet         diff($1, $2)
 *
 * @example         js
 * import { diff } from '@blackbyte/sugar/object';
 * const myObject1 = {
 *    hello: 'world',
 *    plop: 'yop'
 * };
 * const myObject2 = {
 *    coco: 'plop',
 *    hello: 'hey!',
 *    plop: 'yop'
 * };
 * diff(myObject1, myObject2);
 * {
 *    coco: 'plop',
 *    hello: 'hey!'
 * }
 *
 * @see       https://www.npmjs.com/package/is-equal
 * @since       1.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TDiffSettings = {
  deep?: boolean;
  added?: boolean;
  deleted?: boolean;
  equals?: boolean;
  emptyObject?: boolean;
  updated?: boolean;
};

export default function diff(
  object1: any,
  object2: any,
  settings: TDiffSettings = {},
): any {
  settings = {
    deep: true,
    added: true,
    deleted: false,
    equals: false,
    emptyObject: false,
    updated: true,
    ...settings,
  };

  const finalObj = {};

  const keys = Array.from(
    new Set([...Object.keys(object1), ...Object.keys(object2)]),
  );

  for (let i = 0; i < keys.length; i++) {
    const _prop = keys[i];

    if (settings.deep) {
      if (isPlainObject(object1[_prop]) && isPlainObject(object2[_prop])) {
        finalObj[_prop] = diff(object1[_prop], object2[_prop], settings);
        if (Object.keys(finalObj[_prop]).length === 0) delete finalObj[_prop];
        continue;
      }
    }

    if (settings.added) {
      if (object1[_prop] === undefined && object2[_prop] !== undefined) {
        finalObj[_prop] = object2[_prop];
        continue;
      }
    }

    if (settings.deleted) {
      if (object1[_prop] !== undefined && object2[_prop] === undefined) {
        // delete object1[_prop];
        finalObj[_prop] = object1[_prop];
        continue;
      }
    }

    if (settings.equals) {
      if (JSON.stringify(object1[_prop]) === JSON.stringify(object2[_prop])) {
        finalObj[_prop] = object2[_prop];
        continue;
      }
    }

    if (settings.emptyObject) {
      if (
        isPlainObject(object1[_prop]) &&
        Object.keys(object1[_prop]).length === 0
      ) {
        finalObj[_prop] = {};
        continue;
      }
    }

    if (settings.updated) {
      if (object1[_prop] === undefined || object2[_prop] === undefined) {
        continue;
      }

      if (JSON.stringify(object1[_prop]) !== JSON.stringify(object2[_prop])) {
        finalObj[_prop] = object2[_prop];
        continue;
      }
    }
  }

  return finalObj;
}
