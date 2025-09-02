import isGlob from 'is-glob';
/**
 * @name                    isGlob
 * @namespace               shared.is
 * @type                    Function
 * @platform                js
 * @platform                node
 * @status                  stable
 *
 * Check if the passed string is a valid glob pattern or not
 *
 * @param                 {String}        $string             The string to check
 * @return                {Boolean}                           true if is a valid glob pattern, false if not
 *
 * @todo      tests
 *
 * @snippet         isGlob($1)
 *
 * @example               js
 * import { isGlob } from '@blackbyte/sugar/is';
 * isGlob('something/*.js); // => true
 *
 * @see       https://www.npmjs.com/package/is-glob
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function (string) {
    return isGlob(string);
}
//# sourceMappingURL=isGlob.js.map