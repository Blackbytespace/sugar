/**
 * @name                camelCase
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Capital case a string
 *
 * @param         {String}          text        The string to camelCase
 * @return        {String}                      The camelCased string
 *
 * @todo      tests
 *
 * @snippet         camelize($1)
 *
 * @example     js
 * import { camelize } from '@blackbyte/sugar/string';
 * camelize('hello world'); // => helloWorld
 *
 * @see             https://www.npmjs.com/package/change-case
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function camelize(text: string): string;
