import fs from 'fs-extra';

/**
 * @name            ensureDir
 * @namespace       node.fs
 * @type            Function
 * @async
 * @platform        node
 * @status          stable
 *
 * Ensure that the passed directory exists. If not, will be created recursively... (async)
 *
 * @param       {String}              dir           The directory to ensure that it exists...
 * @return      {Promise}                           A promise that will be resolved once the directory has been created if needed...
 *
 * @todo        tests
 *
 * @snippet         ensureDir($1)
 * await ensureDir($1)
 *
 * @example       js
 * import { ensureDir } from '@blackbyte/sugar/fs';
 *  ensureDir('my/cool/dir').then(() => {
 *    // do something...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function ensureDir(dir: string): Promise<void> {
  return fs.ensureDir(dir);
}
