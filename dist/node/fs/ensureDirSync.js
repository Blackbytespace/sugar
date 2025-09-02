import fs from 'fs-extra';
import path from 'path';
import isDirectory from '../is/isDirectory.js';
/**
 * @name                ensureDirSync
 * @namespace           node.fs
 * @type                Function
 * @platform            node
 * @status              stable
 *
 * Ensure that the passed directory exists. If not, will be created recursively... (sync)
 *
 * @param       {String}              dir           The directory to ensure that it exists...
 * @return      {Promise}                           A promise that will be resolved once the directory has been created if needed...
 *
 * @todo        tests
 *
 * @snippet         ensureDirSync($1)
 *
 * @example       js
 * import { ensureDirSync } from '@blackbyte/sugar/fs';
 * ensureDirSync('my/cool/dir');
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function ensureDirSync(dir) {
    // check if the directory already exists
    if (fs.existsSync(dir) && isDirectory(dir))
        return;
    // if the passed path is a file
    if (!isDirectory(dir)) {
        dir = path.dirname(dir);
    }
    // create the directory
    if (!fs.existsSync(dir)) {
        fs.ensureDirSync(dir);
    }
}
//# sourceMappingURL=ensureDirSync.js.map