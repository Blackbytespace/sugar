/**
 * @name                escapeRegexChars
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Escape regex special characters from a string
 *
 * @param         {String}          str        The string to escape regex characters from
 * @return        {String}                      The escaped string
 *
 * @todo      tests
 *
 * @snippet         escapeRegexChars($1)
 *
 * @example     js
 * import { escapeRegexChars } from '@blackbyte/sugar/string';
 * escapeRegexChars('/hello()'); // => \/hello\(\)
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function escapeRegexChars(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
