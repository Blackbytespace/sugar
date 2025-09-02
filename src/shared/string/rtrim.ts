/**
 * @name                rtrim
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Trim right a specified string
 *
 * @param    {String}    string    The string to trim
 * @param    {String}    needle    The string to find an cut out if found
 * @param     {Boolean}     [trimResult=true]       Specify if you want to trim the trimed string
 * @return    {String}    The trimed string
 *
 * @todo      tests
 *
 * @snippet             rtrim($1, $2)
 *
 * @example    js
 * import { rtrim } from '@blackbyte/sugar/string'
 * rtrim('Hello World', 'ld') // Hello Wor
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function rtrim(
  string: string,
  needle: string,
  trimResult: boolean = true,
): string {
  if (string.substr(needle.length * -1) === needle) {
    if (trimResult) {
      return string.substr(0, string.length - needle.length).trim();
    } else {
      return string.substr(0, string.length - needle.length);
    }
  }
  // nothing to trim
  return string;
}
