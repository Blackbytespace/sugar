/**
 * @name            whenOutOfViewport
 * @namespace       js.dom.when
 * @type            Function
 * @platform        js
 * @status          stable
 * @async
 *
 * Monitor an HTMLElement to be notified when it exit the viewport
 *
 * @feature       Promise based API
 * @feature       Some settings to tweak the detection behavior
 *
 * @param 		{HTMLElement} 				$elm 				The element to monitor
 * @param 		{Partial<TWhenOutOfViewportSettings>} 					[settings={}]       Some settings to tweak the detection behavior
 * @return 		(Promise<HTMLElement>) 										The promise that will be resolved when the element exit the viewport
 *
 * @setting       {String}      [offset=10px]     An offset to detect sooner or later the element exits the viewport
 *
 * @snippet         whenOutOfViewport($1)
 * whenOutOfViewport($1).then(\$$elm => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example 	js
 * import { whenOutOfViewport } from '@blackbyte/sugar/dom'
 * whenOutOfViewport(myCoolHTMLElement).then(($elm) => {
 * 		// do something with your element that has exit the viewport...
 * });
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TWhenOutOfViewportSettings = {
    offset: string | number;
};
export default function whenOutOfViewport($elm: HTMLElement, settings?: Partial<TWhenOutOfViewportSettings>): Promise<unknown>;
