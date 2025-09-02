var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from 'fs-extra';
import toString from '../../shared/string/toString.js';
import ensureDirSync from '../fs/ensureDirSync.js';
import { __folderPath } from './_exports.js';
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
 * @param       {String}              path           The file path to write
 * @param       {String}              data          The data to write in the file
 * @param       {Object}              [options={}]  options are what you'd pass to [fs.writeFile()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
 * @return      {Promise}                           A promise that will be resolved when the writeFile is completed
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
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function writeFile(path, data, options = {}) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        const folderPath = __folderPath(path);
        ensureDirSync(folderPath);
        yield fs.outputFile(path, toString(data), options);
        resolve(path);
    }));
}
//# sourceMappingURL=writeFile.js.map