import { trainCase } from 'change-case';
/**
 * @name                trainCase
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Train case a string
 *
 * @param         {String}          text        The string to snakeCase
 * @return        {String}                      The snakeCased string
 *
 * @todo      tests
 *
 * @snippet         trainCase($1)
 *
 * @example     js
 * import { trainCase } from '@blackbyte/sugar/string';
 * trainCase('hello world'); // => Hello-World
 *
 * @see             https://www.npmjs.com/package/change-case
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __trainCase(text) {
    return trainCase(text);
}
//# sourceMappingURL=trainCase.js.map