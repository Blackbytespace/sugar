/**
 * @name            getAnimationProperties
 * @namespace       js.dom.style
 * @type            Function
 * @platform        js
 * @status          beta
 *
 * Get the css animation properties from an HTMLElement in an object format
 *
 * @param 		{HTMLElement} 					elm  		The element to get the properties from
 * @return 		{Object} 									The animation properties
 *
 * @todo      tests
 *
 * @snippet         getAnimationProperties($1)
 *
 * @example  	js
 * import { getAnimationProperties } from '@blackbyte/sugar/dom'
 * const props = getAnimationProperties(myCoolHTMLElement);
 * // output format
 * // {
 * // 	name : ['animation1'],
 * // 	duration : [200],
 * // 	delay : [0],
 * // 	timingFunction : ['linear'],
 * // 	iterationCount : [1],
 * // 	direction : ['forward'],
 * // 	totalDuration : 200
 * // }
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TGetAnimationPropertiesObject = {
    name: string;
    duration: number;
    delay: number;
    timingFunction: string;
    iterationCount: number;
    direction: string;
    fillMode: string;
    playState: string;
};
export type TGetAnimationPropertiesResult = {
    totalDuration: number;
    animations: TGetAnimationPropertiesObject[];
};
export default function getAnimationProperties(elm: HTMLElement): TGetAnimationPropertiesResult;
