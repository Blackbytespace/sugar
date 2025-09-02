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
export default async function readText(): Promise<string> {
  if (navigator?.clipboard?.readText) {
    return navigator.clipboard.readText();
  }
  return Promise.reject('The Clipboard API is not available.');
}
