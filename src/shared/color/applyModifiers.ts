import hslaToRgba from './hslaToRgba.js';
import parseColor from './parseColor.js';
import rgbaToHex from './rgbaToHex.js';

/**
 * @name                    applyModifiers
 * @namespace               shared.color
 * @type                    Function
 * @platform                js
 * @platform                node
 * @status                  stable
 *
 * This function allows you to apply some modifiers to a color.
 * Supported modifiers are:
 * - lightness {0-100}
 * - lighten {0-100}
 * - darken {0-100}
 * - saturation {0-100}
 * - saturate {0-100}
 * - desaturate {0-100}
 * - hue {0-360}
 * - spin {0-360}
 * - alpha {0-100}
 *
 * @param           {Mixed}                               input           The input color to apply modifiers on
 * @param           {TApplyModifiersModifiers}            [modifiers]     The modifiers to apply
 * @return          {TApplyModifiersModifiersResult}                      The converted color object
 *
 * @todo      tests
 *
 * @snippet         applyModifiers($1, $2)
 *
 * @example         js
 * import { applyModifiers } from '@blackbyte/sugar/color';
 * applyModifiers('rgba(10,20,30,100)', { lighten: 10 }); // => { r: 20, g: 30, b: 40, a: 100 }
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TApplyModifiersModifiers = {
  lightness?: number;
  lighten?: number;
  darken?: number;
  saturation?: number;
  saturate?: number;
  desaturate?: number;
  hue?: number;
  spin?: number;
  alpha?: number;
};

export type TApplyModifiersModifiersResult = {
  hex: string;
  rgba: { r: number; g: number; b: number; a: number; string: string };
  hsla: { h: number; s: number; l: number; a: number; string: string };
};

export default function applyModifiers(
  input: string,
  modifiers: TApplyModifiersModifiers = {},
): TApplyModifiersModifiersResult {
  let hsla = parseColor(input, 'hsla') as {
    h: number;
    s: number;
    l: number;
    a: number;
  };

  // apply modifiers
  for (let [modifier, value] of Object.entries(modifiers)) {
    switch (modifier) {
      case 'lightness':
        if (value < 0) value = 0;
        if (value > 100) value = 100;
        hsla.l = value as number;
        break;
      case 'lighten':
        hsla.l += value as number;
        if (hsla.l > 100) hsla.l = 100;
        break;
      case 'darken':
        hsla.l -= value as number;
        if (hsla.l < 0) hsla.l = 0;
        break;
      case 'saturation':
        if (value < 0) value = 0;
        if (value > 100) value = 100;
        hsla.s = value as number;
        break;
      case 'saturate':
        hsla.s += value as number;
        if (hsla.s > 100) hsla.s = 100;
        break;
      case 'desaturate':
        hsla.s -= value as number;
        if (hsla.s < 0) hsla.s = 0;
        break;
      case 'hue':
        hsla.h = value as number;
        break;
      case 'spin':
        hsla.h += value as number;
        while (hsla.h < 0) hsla.h += 360;
        while (hsla.h >= 360) hsla.h -= 360;
        break;
      case 'alpha':
        if (value < 0) value = 0;
        if (value > 1) value = 1;
        hsla.a = value as number;
        break;
    }
  }

  const rgba = hslaToRgba(hsla.h, hsla.s, hsla.l, hsla.a);
  const hex = rgbaToHex(rgba.r, rgba.g, rgba.b, rgba.a);

  return {
    hex,
    rgba: {
      ...rgba,
      string: rgba.toString(),
    },
    hsla: {
      ...hsla,
      string: hsla.toString(),
    },
  };
}
