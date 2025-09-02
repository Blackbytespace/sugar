/**
 * @name            appendToFileSync
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * This function allows you to simply append a string to a file.
 *
 * @param       {String}            path            The file path you want to check. With or without an extension
 * @param       {String}            content             The content to add to the file
 *
 * @snippet         appendToFileSync($1, $2)
 *
 * @todo            tests
 *
 * @example         js
 * import { appendToFileSync } from '@blackbyte/sugar/fs';
 * appendToFileSync('/my/cool/file.txt', 'Hello world');
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function appendToFileSync(path: string, content: string): void;
