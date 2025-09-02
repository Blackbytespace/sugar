// @ts-nocheck

import __isClass from 'is-class';

/**
 * @name                    class
 * @namespace               shared.is
 * @type                    Function
 * @platform                js
 * @platform                node
 * @status                  stable
 *
 * Check if the passed variable (or array of variables) is/are plain variable(s)
 *
 * @param         {Mixed|Array}            variable                  The variable(s) to check
 * @return        {Boolean}                                         true if is class(es), false if not
 *
 * @todo      tests
 *
 * @snippet         isClass($1)
 *
 * @example           js
 * import { isClass } = from '@blackbyte/sugar/is';
 * isClass({ hello: 'world'}); // => false
 * const myCoolClass = class Coco{};
 * isClass(myCoolClass); // => true
 *
 * @see       https://www.npmjs.com/package/is-class
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isClass(cls: any): boolean {
  if (!Array.isArray(cls)) cls = [cls];
  for (let i = 0; i < cls.length; i++) {
    if (!__isClass(cls[i])) return false;
  }
  return true;
}
