/**
 * @name            easeOutQuart
 * @namespace       shared.easing
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * Ease out quart function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * @snippet         easeOutQuart($1)
 *
 * @example         js
 * import { easeOutQuart } from '@blackbyte/sugar/easing';
 * easeOutQuart(0.4);
 *
 * @todo      tests
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function easeOutQuart(t: number): number;
