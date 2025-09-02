import { pathCase } from 'change-case';

/**
 * @name                pathCase
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Path case a string
 *
 * @param         {String}          text        The string to snakeCase
 * @return        {String}                      The snakeCased string
 *
 * @todo      tests
 *
 * @snippet         pathCase($1)
 *
 * @example     js
 * import { pathCase } from '@blackbyte/sugar/string';
 * pathCase('hello world'); // => hello/world
 *
 * @see             https://www.npmjs.com/package/change-case
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __pathCase(text: string): string {
  return pathCase(text);
}
