/**
 * @name                isClassInstance
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the passed item is an object class and not a plain object.
 *
 * @param       {Any}           object          The object to check
 * @return      {Boolean}                           true if is an custom object instance, false if not
 *
 * @snippet         isClassInstance($1)
 *
 * @example         js
 * import { isClassInstance } from '@blackbyte/sugar/is';
 * if (isClassInstance({
 *      something: 'hello'
 * })); // => false
 * class MyClass {
 *      constructor() {}
 * }
 * isClassInstance(new MyClass());
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isClassInstance(object: any): boolean;
