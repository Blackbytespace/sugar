import { kebabCase } from 'change-case';
/**
 * @name                dashCase
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Dash case a string
 *
 * @param         {String}          text        The string to dashCase
 * @return        {String}                      The dashCased string
 *
 * @todo      tests
 *
 * @snippet         dashCase($1)
 *
 * @example     js
 * import { dashCase } from '@blackbyte/sugar/string';
 * dashCase('hello world'); // => hello-world
 *
 * @see             https://www.npmjs.com/package/change-case
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __dashCase(text) {
    return kebabCase(text);
}
//# sourceMappingURL=dashCase.js.map