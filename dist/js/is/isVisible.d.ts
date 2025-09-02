/**
 * @name      isVisible
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        stable
 *
 * Check if the passed HTMLElement is visible or not.
 * Visible mean that it has not an opacity of 0, not a visibility of hidden and not a display of none and `return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);`
 *
 * @param 		{HTMLElement} 				$elm  		The element to check
 * @return 		{Boolean}								If the element is visible or not
 *
 * @snippet         isVisible($1)
 *
 * @todo      tests
 *
 * @example  	js
 * import { isVisible } from '@blackbyte/sugar/dom'
 * if (isVisible(myCoolHTMLElement) {
 * 		// i'm visible
 * }
 *
 * @see             https://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isVisible(elm: HTMLElement): boolean;
