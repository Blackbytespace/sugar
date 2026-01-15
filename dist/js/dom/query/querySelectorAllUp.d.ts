/**
 * @name                 querySelectorAllUp
 * @namespace            js.dom.query
 * @type                Function
 * @platform            js
 * @status              stable
 *
 * Go up the dom three to find all the elements that matches the passed selector
 *
 * @param 		{HTMLElement} 					  $from  		    The element to start from
 * @param 		{String|Function} 				selector 	    A css selector to search for or a check function that will be used
 * @return 		{HTMLElement[]} 								          The elements found or an empty array
 *
 * @todo      tests
 *
 * @snippet         querySelectorAllUp($1, $2)
 *
 * @example  	js
 * import { querySelectorAllUp } from '@blackbyte/sugar/dom'
 * const closestElm =  querySelectorAllUp($elm, '.my-cool-class');
 * if (closestElm) {
 *   // we have found en element that matches the selector
 * }
 * // the selector param can be a function that need to return either true or false like so:
 * querySelectorAllUp($elm, (elm) => {
 *   return elm.hasAttribute('my-cool-attribute')
 * })
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function querySelectorAllUp($from: HTMLElement, selector: string | Function): HTMLElement[];
