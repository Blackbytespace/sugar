var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @name                copyFile
 * @namespace           js.clipboard
 * @type                Function
 * @platform            js
 * @async
 * @status              stable
 *
 * This function allows you to copy to the clipboard the passed file path/url
 *
 * @param       {String}            url            The file url copy to the clipboard
 * @return      {Promise}                          A promise fullfilled when the copy has been made correctly
 *
 * @todo     tests
 *
 * @snippet         __copyFile($1)
 *
 * @example         js
 * import { copyFile } from '@blackbyte/sugar/clipboard';
 * copyFile('https://www.google.com/favicon.ico');
 *
 * @see             https://sentry.io/answers/how-do-i-copy-to-the-clipboard-in-javascript/#:~:text=To%20write%20text%20to%20the,in%20the%20active%20browser%20tab.
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function copyFile(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetch(url);
        const blob = yield data.blob();
        return navigator.clipboard.write([
            new ClipboardItem({
                [blob.type]: blob,
            }),
        ]);
    });
}
//# sourceMappingURL=copyFile.js.map