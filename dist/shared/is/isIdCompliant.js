import __idCompliant from '../string/idCompliant.js';
/**
 * @name            isIdCompliant
 * @namespace            shared.string
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * This function check if the passed value is "id" compliant.
 * This mean that it has no special characters, no spaces and that it is lowercase
 *
 * @param       {String}        string         The string to process
 * @return      {Boolean}                        true if compliant, false if not
 *
 * @snippet         isIdCompliant($1)
 *
 * @example         php
 * import { isIdCompliant } from '@blackbyte/sugar/string';
 * isIdCompliant('Hello world'); // => false
 * isIdCompliant('hello-world'); // => true
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isIdCompliant(str) {
    if (!str) {
        return false;
    }
    return __idCompliant(str) === str;
}
//# sourceMappingURL=isIdCompliant.js.map