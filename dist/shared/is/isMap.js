/**
 * @name                isMap
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the passed value is a js Map
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a Map, false if not
 *
 * @todo      tests
 *
 * @snippet         isMap($1)
 *
 * @example    js
 * import { isMap } from '@blackbyte/sugar/is'
 * const map = new Map();
 * if (isMap(map) {
 *   // do something
 * }
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isMap(value) {
    return value instanceof Map;
}
//# sourceMappingURL=isMap.js.map