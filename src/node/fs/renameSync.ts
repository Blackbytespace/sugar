import fs from 'fs';
import ensureDirSync from './ensureDirSync.js';
import moveSync from './moveSync.js';
import unlinkSync from './unlinkSync.js';

/**
 * @name            renameSync
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * This method allows you to rename a file or directory synchronously.
 *
 * @param       {String}              src           The source path to moveSync
 * @param       {String}              dest          The destination path
 * @param       {TRenameSyncSettings} [settings={}] The settings for the operation
 * @return      {String}                          The new path
 *
 * @snippet         renameSync($1, $2)
 *
 * @example       js
 * import { renameSync } from '@blackbyte/sugar/fs';
 * renameSync('my/cool/dir', 'another/place/for/directory');
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TRenameSyncSettings = {
  override: boolean;
  dry: boolean;
};

export default function renameSync(
  src: string,
  newName: string,
  settings?: Partial<TRenameSyncSettings>,
): string {
  const finalSettings: TRenameSyncSettings = {
    override: true,
    dry: false,
    ...(settings ?? {}),
  };

  const parts = src.split('/');
  let ext = '';

  // remove the file name
  const currentName = parts.pop() as string;
  const currentNameParts = currentName.split('.');
  currentNameParts.shift();
  const currentExt = currentNameParts.join('.');

  let newPath = src;

  // handle the case where the new name has an extension
  if (newName.includes('.')) {
    ext = src.split('.').pop() as string;
    newPath = parts.join('/') + '/' + newName;
  } else {
    ext = currentExt;
    newPath = parts.join('/') + '/' + newName + (ext ? '.' + ext : '');
  }

  // if already the same name
  if (src === newPath) {
    return newPath;
  }

  // only execute if not dry
  if (!finalSettings.dry) {
    // if want to override and file exists,
    // remove it
    if (finalSettings.override && fs.existsSync(newPath)) {
      unlinkSync(newPath);
    }

    // make sure we have the folder to write in
    ensureDirSync(newPath);

    // move the file to his new destination
    moveSync(src, newPath);
  }

  return newPath;
}
