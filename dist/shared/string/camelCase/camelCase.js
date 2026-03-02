import { camelCase } from 'change-case';
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
 * @snippet         camelCase($1)
 *
 * @example     js
 * import { camelCase } from '@blackbyte/sugar/string';
 * camelCase('hello world'); // => helloWorld
 *
 * @see             https://www.npmjs.com/package/change-case
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __camelCase(text) {
    return camelCase(text);
}
//# sourceMappingURL=camelCase.js.map