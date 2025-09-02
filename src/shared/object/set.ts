import isPlainObject from '../is/isPlainObject.js';
import unquote from '../string/unquote.js';
import get from './get.js';

/**
 * @name                    set
 * @namespace               shared.object
 * @type                    Function
 * @platform                js
 * @platform                node
 * @status                  stable
 *
 * Set an object value using a dotted object path like "myObject.myProperty.myValue" to set his position
 * If the path parameter is set to '.', it will act like an `Object.assign(obj, value)`.
 *
 * @param                         {Object}                         obj                      The object in which to set the value
 * @param                         {String|String[]}                        path                      The object path where to set the value
 * @param                         {Mixed}                         value                     The value to set
 * @return                        {Mixed}                                                   Return the setted value if setted correctly, or undefined if something goes wrong...
 *
 * @setting             {Boolean}           [preferAssign=false]            Specify if you prefer using Object.assign rather than = for objects to keep references
 *
 * @todo      tests
 *
 * @snippet         set($1, $2)
 *
 * @example               js
 * import { set } from '@blackbyte/sugar/object';
 *  set('myObject.cool.value', 'Hello world'); // => Hello world
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TSetSettings = {
  preferAssign: boolean;
};

export default function set(
  obj: any,
  path: string | string[],
  value: any,
  settings?: TSetSettings,
): void {
  const finalSettings: TSetSettings = {
    preferAssign: false,
    ...(settings ?? {}),
  };

  let o = obj,
    a;

  if (Array.isArray(path) && path.length === 1) {
    path = path[0];
  }

  if (typeof path === 'string') {
    if (!path || path === '' || path === '.') {
      Object.assign(obj, value);
      return;
    }

    path = path.replace(/\[(\w+)\]/g, '.[$1]');
    // path = path.replace(/^\./, '');
    a = unquote(path)
      .split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm)
      .map((p) => unquote(p));
  } else if (Array.isArray(path)) {
    a = [...path];
  }

  while (a.length - 1) {
    const n = a.shift();
    if (!(n in o)) {
      if (typeof a[0] === 'string') {
        if (a[0].match(/^\[[0-9]+\]$/)) o[n] = [];
        else o[n] = {};
      } else {
        o[n] = {};
      }
    }
    if (!o[n]) {
      o[n] = {};
    }

    o = o[n];
  }

  if (typeof a[0] === 'string' && a[0].match(/^\[[0-9]+\]$/)) {
    if (!Array.isArray(o)) {
      o = [];
    }
    o.push(value);
  } else {
    if (
      isPlainObject(o[a[0]]) &&
      isPlainObject(value) &&
      finalSettings.preferAssign
    ) {
      // empty the current obj
      for (const key in o[a[0]]) {
        delete o[a[0]][key];
      }
      // assigning the new value
      Object.assign(o[a[0]], value);
    } else {
      o[a[0]] = value;
    }
  }
  return get(obj, path);
}
