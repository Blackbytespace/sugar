/**
 * @name                easeOutQuad
 * @namespace           shared.easing
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Ease out quad function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * @snippet         easeOutQuad($1)
 *
 * @example         js
 * import { easeOutQuad } from '@blackbyte/sugar/easing';
 * easeOutQuad(0.4);
 *
 * @todo      tests
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function easeOutQuad(t: number): number;
