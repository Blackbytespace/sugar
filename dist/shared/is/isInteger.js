/**
 * @name                isInteger
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the passed value is an integer
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @todo      tests
 *
 * @snippet         isInteger($1)
 *
 * @example 	js
 * import { isInteger } from '@blackbyte/sugar/is';
 * isInteger(10) => true
 * isInteger('hello') => false
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isInteger(data) {
    return (typeof data === 'number' &&
        !isNaN(data) &&
        (function (x) {
            return (x | 0) === x;
            // @ts-ignore
        })(parseFloat(data)));
}
//# sourceMappingURL=isInteger.js.map