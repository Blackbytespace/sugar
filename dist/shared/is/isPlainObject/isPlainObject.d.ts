/**
 * @name                      isPlainObject
 * @namespace                 shared.is
 * @type                      Function
 * @platform                  js
 * @platform                  node
 * @status                    stable
 *
 * Check if the passed object (or array of objects) is/are plain object(s)
 *
 * @param         {Object|Array}            object                  The object(s) to check
 * @return        {Boolean}                                         true if is plain object(s), false if not
 *
 * @todo      tests
 *
 * @snippet         isPlainObject($1)
 *
 * @example           js
 * import { isPlainObject } from '@blackbyte/sugar/is';
 * isPlainObject({ hello: 'world'}); // => true
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isPlainObject(object: any): boolean;
