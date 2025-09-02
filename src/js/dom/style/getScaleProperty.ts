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
  if (!transform) return;

  const matrix = rematrix.fromString(transform).toString();
  var values = matrix.split(','),
    pi = Math.PI,
    sinB = parseFloat(values[8]),
    b = Math.round((Math.asin(sinB) * 180) / pi),
    cosB = Math.cos((b * pi) / 180),
    matrixVal10 = parseFloat(values[9]),
    a = Math.round((Math.asin(-matrixVal10 / cosB) * 180) / pi),
    matrixVal1 = parseFloat(values[0]),
    c = Math.round((Math.acos(matrixVal1 / cosB) * 180) / pi);

  return {
    x: a,
    y: b,
    z: c,
  };
}
