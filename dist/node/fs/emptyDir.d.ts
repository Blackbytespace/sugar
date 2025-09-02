/**
 * @name                emptyDir
 * @namespace           node.fs
 * @type                Function
 * @async
 * @platform            node
 * @status              stable
 *
 * Empty a directory (async)
 *
 * @param       {String}              dir           The directory path to empty
 * @return      {Promise}                           A promise that will be resolved once the directory has been cleaned
 *
 * @todo        tests
 *
 * @snippet             emptyDir($1)
 * await emptyDir($1)
 *
 * @example       js
 * import { emptyDir } from '@blackbyte/sugar/fs';
 * await emptyDir('my/cool/directory').then(() => {
 *    // do something...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function emptyDir(dir: string): Promise<void>;
