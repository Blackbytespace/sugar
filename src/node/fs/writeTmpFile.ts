import __path from 'path';
import tmpDir from 'temp-dir';
import uniqid from '../../node/string/uniqid.js';
import toString from '../../shared/string/toString.js';
import writeFileSync from './writeFileSync.js';

/**
 * @name                writeTmpFile
 * @namespace           node.fs
 * @type                Function
 * @async
 * @platform            node
 * @status              stable
 *
 * Create a temporary file on the disk with the passed content and returns the path
 * to it.
 *
 * @param       {Any}              data          The data to write in the file
 * @param       {TWriteTmpFileSettings}         [settings={}]           Some settings to customize your temp file creation
 * @return      {Promise<String>}                           A promise that will be resolved when the writeTmpFile is completed with the path to it
 *
 * @todo        tests
 *
 * @setting         {String}            [path=null]         A path relative to the temp folder to store your file
 *
 * @snippet         writeTmpFile($1, $2)
 * await writeTmpFile($1, $2)
 *
 * @example       js
 * import { writeTmpFile } from '@blackbyte/sugar/fs';
 * writeTmpFile('Hello World').then((path) => {
 *    // do something on complete...
 * });
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TWriteTmpFileSettings = {
  path: string;
};

export default async function writeTmpFile(
  data: any,
  settings: Partial<TWriteTmpFileSettings> = {},
): Promise<String> {
  settings = {
    path: undefined,
    ...settings,
  };

  let path = __path.resolve(tmpDir, settings.path ?? uniqid() + '.tmp');
  writeFileSync(path, toString(data));
  return path;
}
