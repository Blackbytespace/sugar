/**
 * @name            writeJsonSync
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * Write a JSON file. If don't exist, will be created as well as the directory structure if needed... (sync)
 *
 * @param       {String}              path           The file path to write
 * @param       {String}              object          The object to write in the JSON file
 * @param       {Object}              [options={}]  options are what you'd pass to [fs.writeJsonSync()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
 *
 * @todo        tests
 *
 * @snippet         writeJsonSync($1, $2)
 *
 * @example       js
 * import { writeJsonSync } from '@blackbyte/sugar/fs';
 * writeJsonSync('my/cool/file.json', { hello: 'world' });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function writeJsonSync(path: string, data: any): string;
