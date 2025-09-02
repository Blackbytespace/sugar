/**
 * @name                lowerFirst
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Lower first letter
 *
 * @param    {String}    string    The string to lower the first letter
 * @return    {String}    The string with the first letter lowered
 *
 * @todo      tests
 *
 * @snippet         lowerFirst($1)
 *
 * @example    js
 * import { lowerFirst } from '@blackbyte/sugar/string'
 * lowerFirst('Hello world') // hello world
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function lowerFirst(string: string): string {
  return string.charAt(0).toLowerCase() + string.slice(1);
}
