import hexToRgba from './hexToRgba.js';
import hslaToRgba from './hslaToRgba.js';
import parseHsla from './parseHsla.js';
import parseRgba from './parseRgba.js';
import rgbaToHsla from './rgbaToHsla.js';

/**
 * @name                parseColor
 * @namespace           shared.color
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 * @private
 *
 * Parse a string and return you the wanted object format like "rgba", "hsl" or "hsv".
 *
 * @param       {String}      color       The color to parse like (#ff0000 | rgba(...) | hsl(...) | hsv(...))
 * @param       {String}      [format='rgba']       The object format wanted. Can be "rgba" or "hsla"
 * @return      {Object}                  The rgba representation of the passed color
 *
 * @todo      tests
 *
 * @snippet         parseColor($1)
 *
 * @example         js
 * import { parseColor } from '@blackbyte/sugar/color';
 * parseColor('rgba(10,20,30,100)'); // => { r: 10, b: 20, b: 30, a: 100 }
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TParseColorRgbaResult = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export type TParseColorHslaResult = {
  h: number;
  s: number;
  l: number;
  a: number;
};

export default function parseColor(
  color: string,
  format: 'rgb' | 'rgba' | 'hsl' | 'hsla' = 'rgba',
): TParseColorHslaResult | TParseColorRgbaResult {
  color = color.replace(/\s/g, '');

  let parsedColor: any;

  if (color.startsWith('rgb')) {
    parsedColor = parseRgba(color);
  } else if (color.startsWith('hsl')) {
    const hsla: any = parseHsla(color);
    parsedColor = hslaToRgba(hsla.h, hsla.s, hsla.l);
  } else if (color.startsWith('#')) {
    parsedColor = hexToRgba(color);
  } else {
    throw new Error(
      `The passed color "${color}" is in a format that cannot be parsed for now...`,
    );
  }

  switch (format) {
    case 'hsla':
    case 'hsl':
      return rgbaToHsla(
        parsedColor.r,
        parsedColor.g,
        parsedColor.b,
        parsedColor.a,
      );
      break;
    case 'rgba':
    case 'rgb':
    default:
      return parsedColor;
      break;
  }
}
