import fs from 'fs-extra';
import { toString } from '@blackbyte/sugar/string';
import { ensureDirSync } from '@blackbyte/sugar/fs';
import { folderPath } from './_exports.js';

/**
 * @name            writeFile
 * @namespace       node.fs
 * @type            Function
 * @async
 * @platform        node
 * @status          stable
 *
 * CWrite a file. If don't exist, will be created as well as the directory structure if needed... ( (async)
 *
 * @param       {String}              path              The file path to write
 * @param       {String}              data              The data to write in the file
 * @param       {Object}              [options={}]      Options are what you'd pass to [fs.writeFile()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
 * @return      {Promise}                               A promise that will be resolved when the writeFile is completed
 *
 * @todo        tests
 *
 * @snippet         writeFile($1, $2)
 * await writeFile($1, $2)
 *
 * @example       js
 * import { writeFile } from '@blackbyte/sugar/fs';
 * writeFile('my/cool/file.txt', 'Hello World').then(() => {
 *    // do something on complete...
 * });
 *
 * @see            https://github.com/jprichardson/node-fs-extra
 * @since          1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function writeFile(
  path: string,
  data: any,
  options = {},
): Promise<string> {
  return new Promise(async (resolve) => {
    const _folderPath = folderPath(path);
    ensureDirSync(_folderPath);
    await fs.outputFile(path, toString(data), options);
    resolve(path);
  });
}
