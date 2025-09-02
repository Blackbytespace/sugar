/**
 * @name            offsetFromParent
 * @namespace       js.dom.offset
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Get the offset top and left of the passed element from his parent top left point
 *
 * @param 		{HTMLElement} 					elm  		The element to get the offset from
 * @return 		{top: number; left: number;} 									The offset top and left object
 *
 * @snippet         offsetFromParent($1)
 *
 * @todo      tests
 *
 * @example  	js
 * import { offsetFromParent } from '@blackbyte/sugar/dom'
 * const offsetFromParentElm = offsetFromParent(myCoolElement);
 * // output : { top : 200, left : 300 }
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function offsetFromParent(elm: HTMLElement): {
    top: number;
    left: number;
};
