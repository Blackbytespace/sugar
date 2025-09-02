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
export default function ensureDirSync(dir: string): void;
