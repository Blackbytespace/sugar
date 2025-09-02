/**
 * @name        getRotateProperties
 * @namespace   js.dom.style
 * @type        Function
 * @platform    js
 * @status      stable
 *
 * Get a rotate properties of an HTMLElement
 *
 * @param 		{HTMLElement} 					$elm  		The element to get the properties from
 * @return 		{Object|undefined} 									The translate x,y and z properties
 *
 * @todo      tests
 *
 * @snippet         getRotateProperties($1)
 *
 * @example  	js
 * import { getRotateProperties } from '@blackbyte/sugar/dom'
 * const props = getRotateProperties(myCoolHTMLElement);
 * // output format
 * // {
 * // 	x : 100,
 * // 	y : 0,
 * // 	z : 0
 * // }
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function getRotateProperties($elm: HTMLElement): {
    x: number;
    y: number;
    z: number;
} | undefined;
