import { minimatch as __minimatch } from 'minimatch';
import unflatten from './unflatten/unflatten.js';
import flatten from './flatten/flatten.js';

/**
 * @name                        getGlob
 * @namespace                   shared.object
 * @type                        Function
 * @platform                    js
 * @platform                    node
 * @status                      stable
 *
 * Retreive an object value using a dotted path like "myObject.myProperty.myValue".
 * It support glob patterns like "something.*.id" and returns you a new object containing
 * all values with the path that matches the passed glob pattern.
 *
 * @param               {Object}                 obj                The object in which to set the value
 * @param               {String}                glob                A glob to describe what you want into the object
 * @param               {Object}            [settings={}]           A settings object to configure your glob get process
 * @return              {Mixed}                                     The getted value or "undefined" if nothing found...
 *
 * @setting         {Boolean}               [unflatten=true]          Specify if you want the result object to be unflattend using the ```unflatten``` sugar function
 *
 * @todo      tests
 *
 * @snippet         getGlob($1, $2)
 *
 * @example             js
 * import { getGlob } from '@blackbyte/sugar/object';
 * getGlob({
 *  hello: {
 *     world: true,
 *     plop: false
 * }, 'hello.*');
 *
 * @since     1.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TGetGlobSettings = {
  unflatten?: boolean;
};

export default function getGlob(
  obj: any,
  glob: string,
  settings: TGetGlobSettings = {},
): any {
  settings = {
    unflatten: true,
    ...settings,
  };

  const flat = flatten(obj);

  const resultObj = {};

  Object.keys(flat).forEach((path) => {
    if (__minimatch(path, glob)) {
      resultObj[path] = flat[path];
    }
  });

  if (settings.unflatten === true) return unflatten(resultObj);
  return resultObj;
}
