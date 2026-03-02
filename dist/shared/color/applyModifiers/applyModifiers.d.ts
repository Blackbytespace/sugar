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
    rgba: {
        r: number;
        g: number;
        b: number;
        a: number;
        string: string;
    };
    hsla: {
        h: number;
        s: number;
        l: number;
        a: number;
        string: string;
    };
};
export default function applyModifiers(input: string, modifiers?: TApplyModifiersModifiers): TApplyModifiersModifiersResult;
