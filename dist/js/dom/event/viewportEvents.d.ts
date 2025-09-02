/**
 * @name            viewportEvents
 * @namespace       js.dom.event
 * @type            Function
 * @platform        js
 * @status          stable
 * @async
 *
 * Monitor when the passed element enter or exit the viewport
 *
 * @param 		{HTMLElement} 						$elm  		The element to monitor
 * @param       {Partial<TViewportEventsSettings>}      [$settings={}]      Some settings to configure your detector
 * @return 		{HTMLElement} 		                    The passed HTMLElement
 *
 * @setting         {String}        [offset='10px']             An offset to detect the in/out earlier or later
 * @setting         {Boolean}       [once=false]                Specify if you want to event to be dispatched only once
 *
 * @event       viewport.in               Dispatched when the passed element enters the viewport
 * @event       viewport.out               Dispatched when the passed element exits the viewport
 *
 * @snippet         viewportEvents($1)
 * viewportEvents($1).addEventListener('viewport.enter', (e) => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example  	js
 * import { viewportEvents } from '@blackbyte/sugar/dom';
 * viewportEvents($1).addEventListener('viewport.enter', (e) => {
 *      // do something
 * });
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TViewportEventsSettings = {
    offset: number | string;
    once: boolean;
};
export default function viewportEvents($elm: HTMLElement, settings?: Partial<TViewportEventsSettings>): HTMLElement;
