/**
 * @name                copyText
 * @namespace           js.clipboard
 * @type                Function
 * @platform            js
 * @async
 * @status              stable
 *
 * This function allows you to copy to the clipboard the passed text
 *
 * @param       {String}            text            The text to copy
 * @return      {Promise}                          A promise fullfilled when the copy has been made correctly
 *
 * @todo     tests
 *
 * @snippet         __copy($1)
 *
 * @example         js
 * import { copyText } from '@blackbyte/sugar/clipboard';
 * copyText('Hello world');
 *
 * @see             https://sentry.io/answers/how-do-i-copy-to-the-clipboard-in-javascript/#:~:text=To%20write%20text%20to%20the,in%20the%20active%20browser%20tab.
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function copyText(text) {
    var _a;
    if ((_a = navigator === null || navigator === void 0 ? void 0 : navigator.clipboard) === null || _a === void 0 ? void 0 : _a.writeText) {
        return navigator.clipboard.writeText(text);
    }
    return Promise.reject('The Clipboard API is not available.');
}
//# sourceMappingURL=copyText.js.map