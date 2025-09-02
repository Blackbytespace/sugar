/**
 * @name                constantCase
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Constant case a string
 *
 * @param         {String}          text        The string to snakeCase
 * @return        {String}                      The snakeCased string
 *
 * @todo      tests
 *
 * @snippet         constantCase($1)
 *
 * @example     js
 * import { constantCase } from '@blackbyte/sugar/string';
 * constantCase('hello world'); // => HELLO_WORLD
 *
 * @see             https://www.npmjs.com/package/change-case
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __constantCase(text: string): string;
