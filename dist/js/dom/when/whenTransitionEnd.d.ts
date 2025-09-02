/**
 * @name                whenTransitionEnd
 * @namespace           js.dom.when
 * @type                Function
 * @platform            js
 * @status              stable
 * @async
 *
 * Monitor an HTMLElement to be notified when his transition has ended
 *
 * @feature       Promise based API
 *
 * @param 		{HTMLElement} 				elm 		The element to monitor
 * @return 		(Promise<HTMLElement>) 								The promise that will be resolved when the element transition has ended
 *
 * @snippet         whenTransitionEnd($1)
 * whenTransitionEnd($1).then(\$elm => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example 	js
 * import { whenTransitionEnd } from '@blackbyte/sugar/dom'
 * await whenTransitionEnd(myCoolHTMLElement);
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function whenTransitionEnd($elm: HTMLElement): Promise<HTMLElement>;
