/**
 * @name                readFile
 * @namespace           js.clipboard
 * @type                Function
 * @platform            js
 * @async
 * @status              stable
 *
 * This function allows you to read the file copied to clipboard
 *
 * @return      {Promise}                          A promise fullfilled when the content has been read correctly
 *
 * @todo     tests
 *
 * @snippet         __readFile($1)
 *
 * @example         js
 * import { readFile } from '@blackbyte/sugar/clipboard';
 * await readFile();
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default async function readText(): Promise<any> {
  if (navigator?.clipboard?.read) {
    return navigator.clipboard.read();
  }
  return Promise.reject('The Clipboard API is not available.');
}
