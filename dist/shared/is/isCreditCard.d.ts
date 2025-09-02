/**
 * @name                isCreditCard
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the passed value is a valid credit card number
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @todo      tests
 *
 * @snippet         isCreditCard($1)
 *
 * @example 	js
 * import {isCreditCard } from '@blackbyte/sugar/is';
 * isCreditCard('john.doe@gmail.com') => true
 * isCreditCard('plop@yop.com') => true
 * isCreditCard('hello') => false
 * isCreditCard('378282246310006') => true
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isCreditCard(value: string): boolean;
