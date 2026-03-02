import fs from 'fs-extra';
/**
 * @name            copySync
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * Copy a file or directory (sync)
 *
 * @param       {String}              src           The source path to copy
 * @param       {String}              dest          The destination path
 *
 * @snippet         copySync($1, $2)
 *
 * @example       js
 * import { copySync } from '@blackbyte/sugar/fs';
 *  copySync('my/cool/file.jpg', 'my/new/file.jpg');
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function copySync(src, dest) {
    fs.copySync(src, dest);
}
//# sourceMappingURL=copySync.js.map