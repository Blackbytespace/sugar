import parseRgba from '../parseRgba/parseRgba.js';

/**
 * @name                    rgba2hsla
 * @namespace               shared.color
 * @type                    Function
 * @platform                js
 * @platform                node
 * @status                  stable
 *
 * RGBA to HSL
 *
 * @param       	{Number|String|Object}        	r 	        	The red value between 0-255 or an object representing r, b, g, a or a string representing the rgba(...) color
 * @param       	{Number}        	g 	        	The green value between 0-255
 * @param       	{Number}        	b 	        	The blue value between 0-255
 * @param       	{Number}        	a 	        	The alpha value between 0-100|0-1
 * @return 	      {object} 		                    The hsl object representation with a "toString" method
 *
 * @todo      tests
 *
 * @snippet         rgbaToHsla($1)
 *
 * @example         js
 * import { rgbaToHsla } from '@blackbyte/sugar/color';
 * rgbaToHsla(10,20,50,10);
 *
 * @see         https://www.npmjs.com/package/colors-convert
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

function RGBAToHSLA(r, g, b, a) {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  // Calculate hue
  // No difference
  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

