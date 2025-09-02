/**
 * @name            whenRemoved
 * @namespace       js.dom.when
 * @type            Function
 * @platform        js
 * @status          stable
 * @async
 *
 * Resolve a promise when the passed node has been removed from the dom
 *
 * @feature       Detect when the element has been removed from the dom
 * @feature       Possibility to pass a check function to check if the attribute suits your needs
 * @feature       Promise based API
 *
 * @param 		{HTMLElement} 				$elm 				The HTMLElement on which to monitor
 * @return 		(Promise<HTMLElement>) 										The promise that will be resolved when the attribute exist on the element (and that it passes the checkFn)
 *
 * @snippet         whenRemoved($1);
 * whenRemoved($1).then(() => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example 	js
 * import { whenRemoved } from '@blackbyte/sugar/dom'
 * whenRemoved(myCoolHTMLElement).then(() => {
 * 		// the element has been removed
 * });
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function whenRemoved($elm: HTMLElement): Promise<HTMLElement>;
