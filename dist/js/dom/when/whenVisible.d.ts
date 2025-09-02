/**
 * @name            whenVisible
 * @namespace       js.dom.when
 * @type            Function
 * @platform        js
 * @status          stable
 * @async
 *
 * Monitor an HTMLElement to be notified when it is visible
 *
 * @feature       Promise based API
 *
 * @param 		{HTMLElement} 				$elm 		The element to monitor
 * @return 		(Promise<HTMLElement>) 								The promise that will be resolved when the element is visible
 *
 * @snippet         whenVisible($1)
 * whenVisible($1).then(\$elm => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example 	js
 * import { whenVisible } from '@blackbyte/sugar/dom'
 * whenVisible(myCoolHTMLElement).then(($elm) => {
 * 		// do something with your element that is now visible
 * });
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TWhenVisibleSettings = {
    whenVisible?: Function;
    whenInvisible?: Function;
    once: boolean;
};
export default function whenVisible($elm: HTMLElement, settings?: Partial<TWhenVisibleSettings>): Promise<HTMLElement>;
