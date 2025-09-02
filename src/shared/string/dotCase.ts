import { dotCase } from 'change-case';

/**
 * @name                dotCase
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Capital case a string
 *
 * @param         {String}          text        The string to snakeCase
 * @return        {String}                      The snakeCased string
 *
 * @todo      tests
 *
 * @snippet         dotCase($1)
 *
 * @example     js
 * import { dotCase } from '@blackbyte/sugar/string';
 * dotCase('hello world'); // => hello.world
 *
 * @see             https://www.npmjs.com/package/change-case
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __dotCase(text: string): string {
  return dotCase(text);
}
