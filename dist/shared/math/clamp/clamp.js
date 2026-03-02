/**
 * @name                clamp
 * @namespace           shared.math
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Clamp a number between two values
 *
 * @param       {Number}       num             The number to clamp
 * @param       {Number}       min             The minimum value
 * @param       {Number}       max             The maximum value
 * @return      {Number}                The clamped number
 *
 * @snippet         clamp($1, $2, $3)
 *
 * @todo      tests
 *
 * @example       js
 * import { clamp } from '@blackbyte/sugar/math';
 * clamp(10, 0, 100); // => 10
 * clamp(0, 0, 100); // => 0
 * clamp(100, 0, 100); // => 100
 * clamp(101, 0, 100); // => 100
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}
//# sourceMappingURL=clamp.js.map