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
 * @setting         {String}        [offset=25]                 An offset to detect the enter/leave earlier or later
 * @setting         {Boolean}       [once=false]                Specify if you want to event to be dispatched only once
 *
 * @event       viewport.enter               Dispatched when the passed element enter the viewport
 * @event       viewport.leave               Dispatched when the passed element leave the viewport
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
 * @changelog       1.0.0
 * Rename events from `viewport.i`n / `viewport.out` to `viewport.enter` / `viewport.leave`
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TViewportEventsSettings = {
    offset: number | string;
    once: boolean;
};
export default function viewportEvents($elm: HTMLElement, settings?: Partial<TViewportEventsSettings>): HTMLElement;
