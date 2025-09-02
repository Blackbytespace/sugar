/**
 * @name            removeSync
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
 * @snippet         removeSync($1)
 *
 * @example       js
 * import { removeSync } from '@blackbyte/sugar/fs';
 *  removeSync('my/cool/file.json');
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function removeSync(path: string): void;
