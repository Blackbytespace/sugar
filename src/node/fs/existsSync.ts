import * as fs from 'fs';

/**
 * @name                existsSync
 * @namespace           node.fs
 * @type                Function
 * @platform            node
 * @status              stable
 *
 * This function simply check if the path passed exists.
 * You can specify what you want to take care of using the settings object
 *
 * @param       {String}        path        The path you want to check
 * @param       {TExistsSettings}       [settings={}]       Some settings for what you want to take care of
 * @return      {Boolean}                       true if exists, false if not
 *
 * @setting         {Boolean}       [directory=true]      Specify if you want to take care of directories
 * @setting         {Boolean}       [file=true]         Specify if you want to take care of files
 * @setting         {Boolean}       [symlink=true]      Specify if you want to take care of symlinks
 *
 * @snippet         existsSync($1)
 *
 * @example         js
 * import { existsSync } from '@blackbyte/sugar/fs';
 * existsSync('/something/cool.txt'); // => true
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TExistsSettings = {
  directory: boolean;
  file: boolean;
  symlink: boolean;
};
export default function existsSync(
  path: string,
  settings?: Partial<TExistsSettings>,
): boolean {
  const set: TExistsSettings = {
    directory: true,
    file: true,
    symlink: true,
    ...(settings || {}),
  };

  let isSymlink = false,
    stats: any;

  try {
    stats = fs.statSync(path);
    if (!stats) return false;
    const realPath = fs.realpathSync(path);
    isSymlink = path !== realPath;
  } catch (e) {
    return false;
  }

  if (isSymlink && !set.symlink) return false;
  if (stats.isDirectory() && !set.directory) return false;
  if (stats.isFile() && !set.file) return false;
  return true;
}
