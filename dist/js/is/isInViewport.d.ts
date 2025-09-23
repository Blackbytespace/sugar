/**
 * @name                isInViewport
 * @namespace           js.is
 * @type                Function
 * @platform            js
 * @status              stable
 *
 * Check if the passed HTMLElement is in the viewport or not
 *
 * @param 		{HTMLElement} 				$elm  			        The element to check if it is in viewport or not
 * @return 		{Boolean}									                If the element is in the viewport or not
 *
 * @snippet         isInViewport($1)
 *
 * @todo      tests
 *
 * @example  	js
 * import { isInViewport } from '@blackbyte/sugar/is'
 * if (isInViewport(myCoolHTMLElement) {
 * 		// i'm in the viewport
 * }
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isInViewport(elm: HTMLElement): boolean;
