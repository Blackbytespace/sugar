/**
 * @name                ltrim
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Trim left a specified string
 *
 * @param    {String}    string    The string to trim
 * @param    {String}    needle    The string to find an cut out if found
 * @param    {Boolean}  [trimResult=true]       If you want to trim the resulted ltrim
 * @return    {String}    The trimed string
 *
 * @todo      tests
 *
 * @snippet         ltrim($1, $2)
 *
 * @example    js
 * import { ltrim } from '@blackbyte/sugar/string'
 *  ltrim('Hello World', 'Hello') // World
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function ltrim(string, needle, trimResult = true) {
    if (string.substr(0, needle.length) === needle) {
        return trimResult
            ? string.substr(needle.length).trim()
            : string.substr(needle.length);
    }
    // nothing to trim
    return string;
}
//# sourceMappingURL=ltrim.js.map