import * as fs from 'fs';

/**
 * @name                grabFirstExistingSync
 * @namespace           node.fs
 * @type                Function
 * @platform            node
 * @status              stable
 *
 * Check every passed paths and return the first existing one.
 *
 * @param         {String[]}            paths              The paths to check
 * @return          {String}                            The first existing path
 *
 * @todo            tests
 *
 * @snippet         grabFirstExistingSync($1)
 *
 * @example       js
 * import { grabFirstExistingSync } from '@blackbyte/sugar/fs';
 * grabFirstExistingSync([
 *  'file/1.txt',
 *  'file/2.txt
 * ]); // => 'file/2.txt'
' *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function grabFirstExistingSync(paths: string[]): string {
  let result: string = '';
  for (let [idx, path] of Object.entries(paths)) {
    if (fs.existsSync(path)) {
      result = path;
      break;
    }
  }
  return result;
}
