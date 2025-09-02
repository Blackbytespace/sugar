/**
 * @name                whenInViewport
 * @namespace           js.dom.when
 * @type                Function
 * @platform            js
 * @status              stable
 * @async
 *
 * Monitor an HTMLElement to be notified when it is in the viewport
 *
 * @feature       Promise based API
 * @feature       Some settings available to tweak the behavior
 *
 * @setting     {String}      [offset='10px']         An offset to detect sooner or later the element entering in the viewport
 *
 * @param 		{HTMLElement} 				elm 					The element to monitor
 * @param 		{Partial<TWhenInViewportSettings>} 					[settings={}] 		Some settings to tweak the detection behavior
 * @return 		(SPromise<HTMLElement>) 											The promise that will be resolved when the element is in the viewport
 *
 * @snippet         whenInViewport($1)
 * whenInViewport($1).then(\$elm => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example 	js
 * import { whenInViewport } from '@blackbyte/sugar/dom'
 * const promise = whenInViewport(myCoolHTMLElement).then((elm) => {
 * 		// do something with your element that has entered the viewport...
 * });
 * // when you want to stop listening
 * promise.cancel();
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TWhenInViewportSettings = {
    offset: string;
    whenIn: Function | undefined;
    whenOut: Function | undefined;
    once: boolean;
};
export type TWhenInViewportResult = Promise<HTMLElement> & {
    cancel: Function;
};
export default function whenInViewport($elm: HTMLElement, settings?: Partial<TWhenInViewportSettings>): TWhenInViewportResult;
