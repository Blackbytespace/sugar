/**
 * @name            stripDocblocks
 * @namespace       shared.string
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * This function simply take a string and get rid of all docblocks
 *
 * @param       {String}            str         The string to process
 * @return      {String}                        The processed string
 *
 * @snippet         stripDocblocks($1)
 *
 * @todo      tests
 *
 * @example         js
 * import { stripDocblocks } from '@blackbyte/sugar/string';
 * stripDocblocks('...');
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function stripDocblocks(str) {
    return str.replace(/(\/\*{2})([\s\S]+?)(\*\/)/gm, '');
}
//# sourceMappingURL=stripDocblocks.js.map