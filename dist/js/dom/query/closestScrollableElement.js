import isScrollable from '../../is/isScrollable.js';
import querySelectorUp from './querySelectorUp.js';
/**
 * @name                closestScrollableElement
 * @namespace           js.dom.query
 * @type                Function
 * @platform            js
 * @status              stable
 *
 * Go up the dom three to find the first element that is scrollable.
 * The default scrollable element is the body
 *
 * @param 		{HTMLElement} 					$elm  		The element to start on
 * @return 		{HTMLElement|undefined} 								The element found or undefined
 *
 * @snippet         closestScrollableElement($1)
 *
 * @todo      tests
 *
 * @example  	js
 * import { closestScrollableElement } from '@blackbyte/sugar/dom';
 * closestScrollableElement($myElement);
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function closestScrollableElement($elm) {
    const res = querySelectorUp($elm, ($e) => isScrollable($e));
    return res;
}
//# sourceMappingURL=closestScrollableElement.js.map