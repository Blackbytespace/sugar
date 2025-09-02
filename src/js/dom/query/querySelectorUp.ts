import matches from './matches.js';

/**
 * @name                 querySelectorUp
 * @namespace            js.dom.query
 * @type                Function
 * @platform            js
 * @status              stable
 *
 * Go up the dom three to find the first element that matches the passed selector
 *
 * @param 		{HTMLElement} 					$from  		The element to start from
 * @param 		{String|Function} 				selector 	A css selector to search for or a check function that will be used
 * @return 		{HTMLElement} 								The element found or null
 *
 * @todo      tests
 *
 * @snippet         querySelectorUp($1, $2)
 *
 * @example  	js
 * import { querySelectorUp } from '@blackbyte/sugar/dom'
 * const closestElm =  querySelectorUp(myCoolElement, '.my-cool-class');
 * if (closestElm) {
 * 		// we have found en element that matches the selector
 * }
 * // the selector param can be a function that need to return either true or false like so:
 *  querySelectorUp(myCoolElement, (elm) => {
 *   return elm.hasAttribute('my-cool-attribute')
 * })
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function querySelectorUp(
  $from: HTMLElement,
  selector: string | Function,
): HTMLElement | undefined {
  const originalElm = $from;
  let $parent: any = $from.parentElement;
  while ($parent && $parent != originalElm.ownerDocument) {
    if (typeof selector === 'function') {
      if (selector($parent)) return $parent as HTMLElement;
    } else if (typeof selector === 'string' && matches($parent, selector)) {
      return $parent as HTMLElement;
    }
    $parent = $parent.parentNode;
  }
}
