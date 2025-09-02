// @ts-nocheck
/**
 * @name                isFunction
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the passed value is a js function
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a function, false if not
 *
 * @todo      tests
 *
 * @snippet         isFunction($1)
 *
 * @example    js
 * import { isFunction } from '@blackbyte/sugar/is'
 * if (isFunction(function() {})) {
 *   // do something
 * }
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isFunction(value) {
    return value && {}.toString.call(value) === '[object Function]';
}
//# sourceMappingURL=isFunction.js.map