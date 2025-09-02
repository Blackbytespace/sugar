/**
 * @name                ensureFile
 * @namespace           node.fs
 * @type                Function
 * @async
 * @platform            node
 * @status              stable
 *
 * Ensure that the passed file exists. If not, it will be created... (async)
 *
 * @param       {String}              filePath           The file to ensure that it exists...
 * @return      {Promise}                           A promise that will be resolved once the file has been created if needed...
 *
 * @todo            tests
 *
 * @snippet         ensureFile($1)
 * await ensureFile($1)
 *
 * @example       js
 * import { ensureFile } from '@blackbyte/sugar/fs';
 * await ensureFile('my/cool/file.jpg').then(() => {
 *    // do something...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function ensureFile(filePath: string): Promise<void>;
