import * as rematrix from 'rematrix';

/**
 * @name            getScaleProperty
 * @namespace       js.dom.style
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Get a scale properties of an HTMLElement
 *
 * @param 		{HTMLElement} 					$elm  		      The element to get the properties from
 * @return 		{Number}                                The scale property
 *
 * @todo      tests
 *
 * @snippet         getScaleProperty($1)
 *
 * @example  	js
 * import { getScaleProperty } from '@blackbyte/sugar/dom'
 * const props = getScaleProperty($myCoolHTMLElement);
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

export default function getScaleProperty(
  $elm: HTMLElement,
): TGetScalePropertyResult | undefined {
  if (!window.getComputedStyle) return;
  const style = getComputedStyle($elm);
  const transform =
    style.transform ||
    style.webkitTransform ||
    // @ts-ignore
    style.mozTransform ||
    // @ts-ignore
    style.msTransform;
  if (!transform || transform === 'none') return;

  // fromString returns a Matrix3D (array of 16 numbers)
  // scaleX is at index 0, scaleY is at index 5
  const matrixArray = rematrix.fromString(transform);

  return {
    x: matrixArray[0],
    y: matrixArray[5],
    z: 1,
  };
}
