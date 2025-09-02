/**
 * @name            easeOutCubic
 * @namespace       shared.easing
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * Ease out cubic function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * @snippet         easeOutCubic($1)
 *
 * @example         js
 * import { easeOutCubic } from '@blackbyte/sugar/easing';
 * easeOutCubic(0.4);
 *
 * @todo      tests
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function easeOutCubic(t: number): number;
