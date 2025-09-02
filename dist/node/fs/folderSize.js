var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-ignore
import fastFolderSize from 'fast-folder-size';
/**
 * @name                folderSize
 * @namespace           node.fs
 * @type                Function
 * @platform            node
 * @status              stable
 * @async
 *
 * Calculate the size of the passed folder and return it through a promise in bytes format
 *
 * @param             {String}                folderPath                  The folder path to calculate the size
 * @return            {Promise}                                           A promise that will be resolved once the folder size has been calculated
 *
 * @todo            tests
 *
 * @snippet         folderSize($1)
 * await folderSize($1)
 *
 * @example           js
 * import { folderSize } from '@blackbyte/sugar/fs';
 * await folderSize('my/cool/folder');
 *
 *
 * @see             https://www.npmjs.com/package/get-folder-size
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function folderSize(folderPath) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        fastFolderSize(folderPath, (err, bytes) => {
            resolve(bytes !== null && bytes !== void 0 ? bytes : 0);
        });
    }));
}
//# sourceMappingURL=folderSize.js.map