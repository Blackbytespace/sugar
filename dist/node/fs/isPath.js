import * as fs from 'fs';
// @ts-ignore
import isValidPath from 'is-valid-path';
/**
 * @name                isPath
 * @namespace           node.fs
 * @type                Function
 * @platform            node
 * @status              stable
 *
 * Check if the passed string is a valid path or not
 *
 * @param         {String}            path              The path to check
 * @param         {Boolean}           [checkExistence=false]      Specify if you want to check that the passed path actually exist
 * @return        {Boolean}                             true if the path is valide, false if not
 *
 * @todo        tests
 *
 * @snippet         isPath($1)
 *
 * @example       js
 * import { isPath } from '@blackbyte/sugar/fs';
 * isPath('hello/world'); // => true
 *
 * @see         https://www.npmjs.com/package/is-valid-path
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isPath(path, checkExistence = false) {
    if (typeof path !== 'string')
        return false;
    // empty string
    if (path.trim() === '')
        return false;
    // multiple lines content
    if (path.split('\n').length > 1)
        return false;
    // check if we have some /
    if (!path.includes('/')) {
        if (!path.includes('.'))
            return false;
    }
    // check if the path is valid or not
    if (!isValidPath(path))
        return false;
    // if we have to check the path existence
    if (checkExistence) {
        if (!fs.existsSync(path))
            return false;
    }
    // otherwise, all is ok
    return true;
}
//# sourceMappingURL=isPath.js.map