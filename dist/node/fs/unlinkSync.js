import fs from 'fs';
import isDirectory from '../is/isDirectory.js';
/**
 * @name            unlinkSync
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * Removes a file or directory. The directory can have contents. If the path does not exist, silently does nothing. Like rm -rf (sync)
 *
 * @param       {String}              path           The file/directory path to delete
 *
 * @todo      tests
 *
 * @snippet         unlinkSync($1)
 *
 * @example       js
 * import { unlinkSync } from '@blackbyte/sugar/fs';
 *  unlinkSync('my/cool/file.json');
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function unlinkSync(path) {
    if (!fs.existsSync(path))
        return;
    if (isDirectory(path)) {
        fs.rmdirSync(path, { recursive: true });
    }
    else {
        fs.unlinkSync(path);
    }
}
//# sourceMappingURL=unlinkSync.js.map