/**
 * @name                isIsoDateTime
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the passed value is a valid iso date time string
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @todo      tests
 *
 * @snippet         isIsoDateTime($1)
 *
 * @example 	js
 * import { isIsoDateTime } from '@blackbyte/sugar/is';
 * isIsoDateTime('john.doe@gmail.com') => false
 * isIsoDateTime('plop@yop.com') => false
 * isIsoDateTime('2008-08-30 17:21:59') => true
 *
 * @see             https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s07.html
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isIsoDateTime(value: string): boolean;
