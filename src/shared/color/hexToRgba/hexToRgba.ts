// @ts-nocheck
/**
 * @name                    hexToRgba
 * @namespace               shared.color
 * @type                    Function
 * @platform                js
 * @platform                node
 * @status                  stable
 *
 * Hex to RGBA
 *
 * @param	              {string}       	hex         		The hex string to convert
 * @return            	{object} 			                  The rgba object representation with a "toString" method
 *
 * @todo      tests
 *
 * @snippet         hexToRgba($1)
 *
 * @example         js
 * import { hexToRgba } from '@blackbyte/sugar/color';
 * hexToRgba('#ff00ff');
 *
 * @see         https://www.npmjs.com/package/colors-convert
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
function hexToRGBA(h) {
  let r = 0,
    g = 0,
    b = 0;

  // 3 digits
  if (h.length == 4) {
    r = parseInt(`${h[1]}${h[1]}`, 16);
    g = parseInt(`${h[2]}${h[2]}`, 16);
    b = parseInt(`${h[3]}${h[3]}`, 16);

    // 6 digits
  } else if (h.length == 7) {
    r = parseInt(`${h[1]}${h[2]}`, 16);
    g = parseInt(`${h[3]}${h[4]}`, 16);
    b = parseInt(`${h[5]}${h[6]}`, 16);
  }
  return {
    r,
    g,
    b,
    a: 1,
    toString() {
      return `rgba(${this.r}, ${this.g}, ${this.b}, 1)`;
    },
  };
}

interface IHexToToRbaResult {
  r: number;
  g: number;
  b: number;
  a: number;
  toString: () => string;
}

export default function hexToRgba(hex: string): IHexToToRbaResult {
  return hexToRGBA(hex);
}
