/**
 * @name                easeOutQuint
 * @namespace           shared.easing
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Ease out quint function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * @snippet         easeOutQuint($1)
 *
 * @example         js
 * import { easeOutQuint } from '@blackbyte/sugar/easing';
 * easeOutQuint(0.4);
 *
 * @todo      tests
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function easeOutQuint(t: number): number;
