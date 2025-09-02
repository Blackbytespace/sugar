/**
 * @name            elementsInViewport
 * @namespace       js.dom.query
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Get all the elements that are in viewport
 *
 * @setting       {HTMLElement}     [rootNode=document.body]      Specify the root node from where you want to query
 *
 * @param 		{Object} 			settings	 		The settings of the query
 * @return 		{HTMLElement} 							The founded element
 *
 * @snippet         elementsInViewport($1)
 *
 * @todo      tests
 *
 * @example 	js
 * import { elementsInViewport } from '@blackbyte/sugar/dom';
 * const $elements = elementsInViewport();
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TElementsInViewportSettings = {
    rootNode: HTMLElement;
    threshold: number;
};
export default function elementsInViewport(settings?: Partial<TElementsInViewportSettings>): HTMLElement[];
