/**
 * @name                isBoolean
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the passed value is a js Boolean
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a Boolean, false if not
 *
 * @todo      tests
 *
 * @snippet         isBoolean($1)
 *
 * @example    js
 * import { isBoolean } from '@blackbyte/sugar/is'
 * if (isBoolean(true) {
 *   // do something
 * }
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isBoolean(value: any): boolean {
  return typeof value === 'boolean';
}
