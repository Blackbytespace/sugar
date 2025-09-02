import __scrollTop from '../distance/scrollTop.js';
import offsetFromViewport from '../offset/offsetFromViewport.js';
/**
 * @name            distanceFromElementTopToViewportTop
 * @namespace       js.dom.distance
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * This function take an element as parameter and returns you to distance it has
 * from the element top to the viewport top in pixels
 *
 * @param       {HTMLElement}       elm             The element you want to get the distance from
 * @return      {Number}                            The calculated distance
 *
 * @snippet         distanceFromElementTopToViewportTop($1)
 *
 * @example         js
 * import { distanceFromElementTopToViewportTop } from '@blackbyte/sugar/dom';
 * distanceFromElementTopToViewportTop(myElement); // => 23
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function distanceFromElementTopToViewportTop(elm) {
    const offsets = offsetFromViewport(elm);
    const scrollTop = __scrollTop();
    // @ts-ignore
    return offsets.top - scrollTop;
}
//# sourceMappingURL=distanceFromElementTopToViewportTop.js.map