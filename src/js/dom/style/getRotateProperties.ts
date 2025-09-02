import * as rematrix from 'rematrix';

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
export default function getRotateProperties($elm: HTMLElement):
  | {
      x: number;
      y: number;
      z: number;
    }
  | undefined {
  if (!window.getComputedStyle) return;
  const style = getComputedStyle($elm);
  const transform =
    style.transform ||
    style.webkitTransform ||
    // @ts-ignore
    style.mozTransform ||
    // @ts-ignore
    style.msTransform;
  if (!transform)
    return {
      x: 0,
      y: 0,
      z: 0,
    };

  const matrix = rematrix.fromString(transform).toString();
  var values = matrix.split(','),
    pi = Math.PI,
    sinB = parseFloat(values[8]),
    b = Math.round((Math.asin(sinB) * 180) / pi),
    cosB = Math.cos((b * pi) / 180),
    matrixVal10 = parseFloat(values[9]),
    a = Math.round((Math.asin(-matrixVal10 / cosB) * 180) / pi),
    matrixVal1 = parseFloat(values[0]),
    c = Math.round((Math.acos(matrixVal1 / cosB) * 180) / pi) * -1;

  return {
    x: a,
    y: b,
    z: c,
  };
}
