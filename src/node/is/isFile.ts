import * as __fs from 'fs';

/**
 * @name            isFile
 * @namespace       node.is
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * This function check if the passed string path is a file or not
 *
 * @param     {String}        path        The path to check
 * @return    {Boolean}                   true if is a file, false if not
 *
 * @todo      tests
 *
 * @snippet         isFile($1);
 *
 * @example     js
 * import { isFile } from '@blackbyte/sugar/is';
 * isFile('something/cool');
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TIsFileSettings = {
  symlink?: boolean;
};

export default function isFile(path: string, settings: TIsFileSettings = {}) {
  settings = {
    symlink: true,
    ...settings,
  };

  let isMatching = __fs.existsSync(path);
  if (!isMatching) return false;
  if (settings.symlink && __fs.lstatSync(path).isSymbolicLink()) {
    const realPath = __fs.realpathSync(path);
    isMatching = isMatching && __fs.lstatSync(realPath).isFile();
  } else {
    isMatching = isMatching && __fs.lstatSync(path).isFile();
  }
  return isMatching;
}
