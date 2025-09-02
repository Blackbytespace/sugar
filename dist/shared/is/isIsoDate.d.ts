/**
 * @name                isIsoDate
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the passed value is a valid iso date string
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @todo      tests
 *
 * @snippet         isIsoDate($1)
 *
 * @example 	js
 * import { isIsoDate } from '@blackbyte/sugar/is';
 * isIsoDate('john.doe@gmail.com') => false
 * isIsoDate('plop@yop.com') => false
 * isIsoDate('hello') => false
 * isIsoDate('2008-08') => true
 *
 * @see             https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s07.html
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isIsoDate(value: string): boolean;
