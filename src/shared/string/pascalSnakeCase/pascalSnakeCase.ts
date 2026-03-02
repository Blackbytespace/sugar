import { pascalSnakeCase } from 'change-case';

/**
 * @name                pascalSnakeCase
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Pascal snake case a string
 *
 * @param         {String}          text        The string to snakeCase
 * @return        {String}                      The snakeCased string
 *
 * @todo      tests
 *
 * @snippet         pascalSnakeCase($1)
 *
 * @example     js
 * import { pascalSnakeCase } from '@blackbyte/sugar/string';
 * pascalSnakeCase('hello world'); // => Hello_World
 *
 * @see             https://www.npmjs.com/package/change-case
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __pascalSnakeCase(text: string): string {
  return pascalSnakeCase(text);
}
