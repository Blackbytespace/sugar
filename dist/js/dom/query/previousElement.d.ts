/**
 * @name          previousElement
 * @namespace     js.dom.query
 * @type          Function
 * @platform      js
 * @status        stable
 *
 * Browse the passed element previous siblings to find the first element that matches the passed selector
 *
 * @param 		{HTMLElement} 					$elm  		The element to start on
 * @param 		{String} 						selector 	A css selector to search for
 * @return 		{HTMLElement|undefined} 								The element found or undefined
 *
 * @snippet         previousElement($1, $2)
 *
 * @todo      tests
 *
 * @example  	js
 * import { previousElement } from '@blackbyte/sugar/dom'
 * const previousElm = previousElement(myCoolElement, '.my-cool-class');
 * if (previousElm) {
 * 		// we have found en element that matches the selector
 * }
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function previousElement($elm: HTMLElement, selector: string): HTMLElement | undefined;
