/**
 * @name            positionFromEvent
 * @namespace       js.dom.position
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Get the position from an event "touchstart", "touchmove", "touchend", "mousedown", "mousemove" or "mouseup".
 *
 * @param 		{MouseEvent|TouchEvent} 					e  		The event to get the position from
 * @return 		{x: number; y: number;} 									The absolute position of the event
 *
 * @snippet         positionFromEvent($1)
 *
 * @todo      tests
 *
 * @example  	js
 * import { positionFromEvent } from '@blackbyte/sugar/dom'
 * positionFromEvent(e);
 * // output : { x, 230, y: 122 }
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function positionFromEvent(e: MouseEvent | TouchEvent): {
    x: number;
    y: number;
};
