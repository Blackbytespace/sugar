import * as __fs from 'fs';

/**
 * @name            isDirectory
 * @namespace       node.is
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * This function check if the passed string path is a directory or not
 *
 * @param     {String}        path        The path to check
 * @return    {Boolean}                   true if is a directory, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         isDirectory($1)
 *
 * @example     js
 * import { isDirectory } from '@blackbyte/sugar/is';
 * isDirectory('something/cool');
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TIsDirectorySettings = {
  symlink?: boolean;
};

export default function isDirectory(
  path: string,
  settings: TIsDirectorySettings = {},
) {
  settings = {
    symlink: true,
    ...settings,
  };

  let isMatching = __fs.existsSync(path);
  if (!isMatching) return false;
  if (settings.symlink && __fs.lstatSync(path).isSymbolicLink()) {
    const realPath = __fs.realpathSync(path);
    isMatching = isMatching && __fs.lstatSync(realPath).isDirectory();
  } else {
    isMatching = isMatching && __fs.lstatSync(path).isDirectory();
  }
  return isMatching;
}
