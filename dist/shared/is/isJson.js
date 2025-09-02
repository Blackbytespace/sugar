/**
 * @name                isJson
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the passed value is a valid json
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a valid json, false if not
 *
 * @todo      tests
 *
 * @snippet         isJson($1)
 *
 * @example    js
 * import { isJson } from '@blackbyte/sugar/is'
 * if (isJson('[{id:10}]')) {
 *   // do something
 * }
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isJson(value) {
    try {
        const res = JSON.parse(value);
        if (Object.keys(res).length)
            return true;
        return false;
    }
    catch (e) {
        return false;
    }
    return true;
}
//# sourceMappingURL=isJson.js.map