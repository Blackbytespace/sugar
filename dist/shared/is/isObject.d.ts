/**
 * @name                isObject
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the passed value is a js object
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a object, false if not
 *
 * @todo      tests
 *
 * @snippet         isObject($1)
 *
 * @example    js
 * import { isObject } from '@blackbyte/sugar/is'
 * if (isObject({}) {
 *   // do something
 * }
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isObject(value: any): boolean;
