/**
 * @name            positionFromEvent
 * @namespace       js.dom.position
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Get the position from an event like:
 * - `touchstart`
 * - `touchmove`
 * - `touchend`
 * - `touchcancel`
 * - `mousedown`
 * - `mouseup`
 * - `mousemove`
 * - `mouseover`
 * - `mouseout`
 * - `mouseenter`
 * - `mouseleave`
 * - `pointerdown`
 * - `pointerup`
 * - `pointermove`
 * - `pointerover`
 * - `pointerout`
 * - `pointerenter`
 * - `pointerleave`
 *
 * @param 		{MouseEvent|PointerEvent|TouchEvent} 					event  		  The event to get the position from
 * @return 		{x: number; y: number;} 									                The absolute position of the event
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
export default function positionFromEvent(e) {
    let x, y;
    if (e.type == 'touchstart' ||
        e.type == 'touchmove' ||
        e.type == 'touchend' ||
        e.type == 'touchcancel') {
        // @ts-ignore
        const evt = typeof e.originalEvent === 'undefined' ? e : e.originalEvent;
        const touch = evt.touches[0] || evt.changedTouches[0];
        x = touch.pageX;
        y = touch.pageY;
    }
    else if (e.type == 'mousedown' ||
        e.type == 'mouseup' ||
        e.type == 'mousemove' ||
        e.type == 'mouseover' ||
        e.type == 'mouseout' ||
        e.type == 'mouseenter' ||
        e.type == 'mouseleave' ||
        e.type === 'pointerdown' ||
        e.type === 'pointerup' ||
        e.type === 'pointermove' ||
        e.type === 'pointerover' ||
        e.type === 'pointerout' ||
        e.type === 'pointerenter' ||
        e.type === 'pointerleave') {
        // @ts-ignore
        x = e.clientX;
        // @ts-ignore
        y = e.clientY;
    }
    return {
        x,
        y,
    };
}
//# sourceMappingURL=positionFromEvent.js.map