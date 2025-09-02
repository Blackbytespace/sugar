/**
 * @name            getScaleProperty
 * @namespace       js.dom.style
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Get a scale properties of an HTMLElement
 *
 * @param 		{HTMLElement} 					$elm  		The element to get the properties from
 * @return 		{Number}                                     The scale property
 *
 * @todo      tests
 *
 * @snippet         getScaleProperty($1)
 *
 * @example  	js
 * import { getScaleProperty } from '@blackbyte/sugar/dom'
 * const props = getScaleProperty(myCoolHTMLElement);
 * // output format
 * // 2
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TGetScalePropertyResult = {
    x: number;
    y: number;
    z: number;
};
export default function getScaleProperty($elm: HTMLElement): TGetScalePropertyResult | undefined;
