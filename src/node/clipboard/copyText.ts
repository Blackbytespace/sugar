// @ts-nocheck

import clipboardy from 'clipboardy';
import ncp from 'copy-paste';

/**
 * @name            copyText
 * @namespace       node.clipboard
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * Simple function to copy things into the system clipboard.
 * This is using https://www.npmjs.com/package/clipboardy under the hood.
 *
 * @param       {String}      text        The text to copy
 * @return      {String}                The text that has been copied
 *
 * @todo      tests
 *
 * @snippet         copyText($1)
 *
 * @example       js
 * import { copyText } from '@blackbyte/sugar/clipboard';
 * copyText('Hello world');
 *
 * @since       1.0.0
 * @see         https://www.npmjs.com/package/clipboardy
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function copyText(text: string): string {
  try {
    clipboardy.writeSync(text);
  } catch (e) {
    ncp.copy(text);
  }
  return text;
}
