/**
 * @name                emptyDirSync
 * @namespace           node.fs
 * @type                Function
 * @platform            node
 * @status              stable
 *
 * Empty a directory (sync)
 *
 * @param       {String}              dir           The directory path to empty
 *
 * @todo        tests
 *
 * @snippet         emptyDirSync($1)
 *
 * @example       js
 * import { emptyDirSync } from '@blackbyte/sugar/fs';
 * emptyDirSync('my/cool/directory');
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function emptyDirSync(dir: string): void;
