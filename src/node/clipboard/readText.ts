// @ts-nocheck

import clipboardy from 'clipboardy';

/**
 * @name            readText
 * @namespace       node.clipboard
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * Simple function to read things from the system clipboard.
 * This is using https://www.npmjs.com/package/clipboardy under the hood.
 *
 * @return       {String}             The text to read
 *
 * @todo      tests
 *
 * @snippet         readText()
 *
 * @example       js
 * import { copyText, readText } from '@blackbyte/sugar/clipboard';
 * copyText('Hello world');
 * readText(); // => Hello world
 *
 * @since       1.0.0
 * @see         https://www.npmjs.com/package/clipboardy
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function readText(): string {
  return clipboardy.readSync();
}
