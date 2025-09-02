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
export default function copyFile(url: string): Promise<void>;
