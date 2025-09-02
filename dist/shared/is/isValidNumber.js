/**
 * @name                isValidNumber
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the passed value is a valid number.
 * A valid number is either an integer or a number (float).
 *
 * @param       {any}           value       The value to check
 * @return   {Boolean}   true if it's in a valid number, false if not
 *
 * @todo      tests
 *
 * @snippet         isValidNumber()
 *
 * @example    js
 * import { isValidNumber } from '@blackbyte/sugar/is'
 * isValidNumber(12) // true
 * isValidNumber('he') // false
 * isValidNumber(undefined) // false
 * isValidNumber(NaN) // false
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isValidNumber(value) {
    if (Number.isInteger(value)) {
        return true;
    }
    if (!Number.isNaN(parseFloat(value))) {
        return true;
    }
    return false;
}
//# sourceMappingURL=isValidNumber.js.map