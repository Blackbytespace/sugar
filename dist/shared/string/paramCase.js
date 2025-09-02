import { kebabCase } from 'change-case';
/**
 * @name                paramCase
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * This function transform a string into a param case one like so "something-cool"
 *
 * @param       {String}        string          The string to convert
 * @return      {String}                        The converted string
 *
 * @todo      tests
 *
 * @snippet         paramCase($1)
 *
 * @example       js
 * import { paramCase } from '@blackbyte/sugar/string';
 * paramCase('some thoing cool'); // => some-thing-cool
 *
 * @see         https://www.npmjs.com/package/change-case
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __paramCase(string) {
    return kebabCase(string);
}
//# sourceMappingURL=paramCase.js.map