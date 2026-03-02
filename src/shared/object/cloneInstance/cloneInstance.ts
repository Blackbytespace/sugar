/**
 * @name                cloneInstance
 * @namespace           shared.object
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * This function allows you to clone an object instance.
 *
 * @param       {Object}        instance        The object instance to clone
 * @return      {Object}                      The cloned object
 *
 * @todo      tests
 *
 * @snippet         cloneInstance($1)
 *
 * @example       js
 * import { cloneInstance } from '@blackbyte/sugar/object';
 * const myInstance = new MyClass();
 * const myInstanceClone = cloneInstance(myInstance);
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function cloneInstance<T = any>(instance: T): T {
  return Object.assign(
    Object.create(Object.getPrototypeOf(instance)),
    instance,
  );
}
