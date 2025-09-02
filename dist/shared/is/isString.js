/**
 * @name                isString
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the passed value is a js String
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a String, false if not
 *
 * @todo      tests
 *
 * @snippet         isString($1)
 *
 * @example    js
 * import { isString } from '@blackbyte/sugar/is'
 * if (isString({}) {
 *   // do something
 * }
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isString(value) {
    return typeof value === 'string' || value instanceof String;
}
//# sourceMappingURL=isString.js.map