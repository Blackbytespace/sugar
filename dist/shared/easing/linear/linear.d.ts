/**
 * @name            linear
 * @namespace       shared.easing
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * Ease linear function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				  The value depending on time
 *
 * @snippet         linear($1)
 *
 * @example         js
 * import { linear } from '@blackbyte/sugar/easing';
 * linear(0.4);
 *
 * @todo      tests
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function linear(t: number): number;
