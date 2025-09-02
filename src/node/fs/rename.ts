import renameSync from './renameSync.js';

/**
 * @name            rename
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          stable
 * @async
 *
 * Moves a file or directory, even across devices (sync)
 *
 * @param       {String}              src           The source path to moveSync
 * @param       {String}              dest          The destination path
 *
 * @snippet         rename($1, $2)
 *
 * @example       js
 * import { rename } from '@blackbyte/sugar/fs';
 * await rename('my/cool/dir', 'another/place/for/directory');
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TRenameSettings = {
  override: boolean;
};

export default async function rename(
  src: string,
  newName: string,
  settings?: Partial<TRenameSettings>,
): Promise<void> {
  renameSync(src, newName, settings);
}
