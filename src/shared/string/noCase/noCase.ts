import { noCase } from 'change-case';

/**
 * @name                noCase
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * No case a string
 *
 * @param         {String}          text        The string to snakeCase
 * @return        {String}                      The snakeCased string
 *
 * @todo      tests
 *
 * @snippet         noCase($1)
 *
 * @example     js
 * import { noCase } from '@blackbyte/sugar/string';
 * noCase('hello world'); // => hello world
 *
 * @see             https://www.npmjs.com/package/change-case
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __noCase(text: string): string {
  return noCase(text);
}
