/**
 * @name          nextElement
 * @namespace     js.dom.query
 * @type          Function
 * @platform      js
 * @status        stable
 *
 * Browse the passed element next siblings to find the first element that matches the passed selector
 *
 * @param 		{HTMLElement} 					$elm  		The element to start on
 * @param 		{String} 						selector 	A css selector to search for
 * @return 		{HTMLElement|undefined} 								The element found or undefined
 *
 * @snippet         nextElement($1, $2)
 *
 * @todo      tests
 *
 * @example  	js
 * import { nextElement } from '@blackbyte/sugar/dom'
 * const nextElm =  nextElement(myCoolElement, '.my-cool-class');
 * if (nextElm) {
 * 		// we have found en element that matches the selector
 * }
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function nextElement($elm: HTMLElement, selector: string): HTMLElement | undefined;
