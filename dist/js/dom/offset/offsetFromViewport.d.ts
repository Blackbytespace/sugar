/**
 * @name                offsetFromViewport
 * @namespace           js.dom.offset
 * @type                Function
 * @platform            js
 * @status              stable
 *
 * Get the offset top and left of the passed element from the document top left point
 *
 * @param 		{HTMLElement} 					elm  		The element to get the offset from
 * @return 		{top: number; left: number;} 									The offset top and left object
 *
 * @snippet         offsetFromViewport($1)
 *
 * @todo      tests
 *
 * @example  	js
 * import { offsetFromViewport } from '@blackbyte/sugar/dom'
 * const offsetFromViewport = offset(myCoolElement);
 * // output : { top : 200, left : 300 }
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function offsetFromViewport(elm: HTMLElement): {
    top: number;
    left: number;
};
