/**
 * @name                uncamelize
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Uncamelize a string
 *
 * @param    {String}    string    The string to uncamelize
 * @param    {String}    [separator='-']    The separator to use
 * @return    {String}    The uncamelized string
 *
 * @todo      tests
 *
 * @snippet         uncamelize($1)
 *
 * @example    js
 * import { uncamelize } from '@blackbyte/sugar/string'
 * uncamelize('helloWorldAndUniverse') // hello-world-and-universe
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function uncamelize(
  text: string,
  separator: string = '-',
): string {
  // Replace all capital letters by separator followed by lowercase one
  let res = '';
  res = text.replace(/[A-Z]/g, function (letter) {
    return separator + letter.toLowerCase();
  });

  // Remove first separator (to avoid _hello_world name)
  if (res.slice(0, 1) === separator) res = res.slice(1);

  return res;
}
