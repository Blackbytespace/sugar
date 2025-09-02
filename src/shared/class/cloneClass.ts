import { cloneClass } from 'clone-class';

/**
 * @name                cloneClass
 * @namespace           shared.class
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Clone ES6 Classes
 *
 * @param       {Class}          class        The class to clone
 * @return      {Class}                             A new class
 *
 * @todo      tests
 *
 * @snippet         cloneClass($1)
 *
 * @example         js
 * import { cloneClass } from '@blackbyte/sugar/class';
 * const NewClass = cloneClass(class MyClass() {});
 *
 * @see             https://www.npmjs.com/package/clone-class
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function (cls: any): any {
  return cloneClass(cls);
}
