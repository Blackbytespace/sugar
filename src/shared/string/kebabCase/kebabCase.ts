import { kebabCase } from 'change-case';

/**
 * @name                kebabCase
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Kebab case a string
 *
 * @param         {String}          text        The string to snakeCase
 * @return        {String}                      The snakeCased string
 *
 * @todo      tests
 *
 * @snippet         kebabCase($1)
 *
 * @example     js
 * import { kebabCase } from '@blackbyte/sugar/string';
 * kebabCase('hello world'); // => Hello World
 *
 * @see             https://www.npmjs.com/package/change-case
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __kebabCase(text: string): string {
  return kebabCase(text);
}
