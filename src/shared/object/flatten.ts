import { flatten } from 'flat';

/**
 * @name                        flatten
 * @namespace                   shared.object
 * @type                        Function
 * @platform                    js
 * @platform                    node
 * @status                      stable
 *
 * Transform the passed multiple level object into a single level one
 *
 * @param               {Object}                          object                    The object to flatten
 * @param               {Object}                          [settings={}]             An object of settings to configure your flatten process
 * @return              {Object}                                                    The flatten object
 *
 * @todo      tests
 *
 * @snippet         flatten($1)
 *
 * @example             js
 * import { flatten } from '@blackbyte/sugar/object';
 * flatten({
 *    hello: {
 *      world: 'Coco'
 *    }
 * });
 *
 * @see.     https://www.npmjs.com/package/flat
 * @since       1.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function _flatten(obj): Record<string, any> {
  return flatten(obj);
}
