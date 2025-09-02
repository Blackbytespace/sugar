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
 * @name                readText
 * @namespace           js.clipboard
 * @type                Function
 * @platform            js
 * @async
 * @status              stable
 *
 * This function allows you to read the content of the clipboard
 *
 * @return      {Promise}                          A promise fullfilled when the content has been read correctly
 *
 * @todo     tests
 *
 * @snippet         __readText($1)
 *
 * @example         js
 * import { copyText, __readText } from '@blackbyte/sugar/clipboard';
 * await readText();
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function readText() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if ((_a = navigator === null || navigator === void 0 ? void 0 : navigator.clipboard) === null || _a === void 0 ? void 0 : _a.readText) {
            return navigator.clipboard.readText();
        }
        return Promise.reject('The Clipboard API is not available.');
    });
}
//# sourceMappingURL=readText.js.map