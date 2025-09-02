import hslaToRgba from './hslaToRgba.js';
import parseColor from './parseColor.js';
import rgbaToHex from './rgbaToHex.js';
import rgbaToHsla from './rgbaToHsla.js';
/**
 * @name                    convert
 * @namespace               shared.color
 * @type                    Function
 * @platform                js
 * @platform                node
 * @status                  stable
 *
 * This function take as input any color format like rgba Object, hsl Object, hsv Object, hex String, rgba String, hsl String or hsv String
 * and convert it into the wanted format like "rgba", "hsl", "hsv", "hex", "rgbaString", "hslString" or "hsvString"
 *
 * @param           {Mixed}               input           The input color to convert
 * @param           {String}              [format="rgba"]     The format wanted
 * @return          {Mixed}                               The converted color
 *
 * @todo      tests
 *
 * @snippet         convert($1, $2)
 *
 * @example         js
 * import { convert } from '@blackbyte/sugar/color';
 * convert('rgba(10,20,30,100)', 'rgba'); // => { r: 10, g: 20, b: 30, a: 100 }
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function convert(input, format = 'rgba') {
    // transforming the input into rgba object
    let rgbaObj = {};
    if (typeof input === 'string') {
        // @ts-ignore
        rgbaObj = parseColor(input, 'rgba');
    }
    else if (typeof input === 'object') {
        if (input.r !== undefined &&
            input.g !== undefined &&
            input.b !== undefined) {
            rgbaObj = input;
        }
        else if (input.h !== undefined &&
            input.s !== undefined &&
            input.l !== undefined) {
            rgbaObj = hslaToRgba(input.h, input.s, input.l);
        }
    }
    const hslaObj = rgbaToHsla(rgbaObj.r, rgbaObj.g, rgbaObj.b, rgbaObj.a);
    switch (format) {
        case 'rgb':
            return {
                r: rgbaObj.r,
                g: rgbaObj.g,
                b: rgbaObj.b,
            };
        case 'rgbString':
            return `rgb(${rgbaObj.r},${rgbaObj.g},${rgbaObj.b})`;
        case 'rgba':
            return rgbaObj;
        case 'rgbaString':
            return `rgba(${rgbaObj.r},${rgbaObj.g},${rgbaObj.b},${rgbaObj.a})`;
        case 'hsl':
            return {
                h: hslaObj.h,
                s: hslaObj.s,
                l: hslaObj.l,
            };
        case 'hslString':
            return `hsl(${hslaObj.h},${hslaObj.s},${hslaObj.l})`;
        case 'hsla':
            return hslaObj;
        case 'hslaString':
            return `hsla(${hslaObj.h},${hslaObj.s},${hslaObj.l},${hslaObj.a})`;
        case 'hex':
        case 'hexString':
            return rgbaToHex(rgbaObj.r, rgbaObj.g, rgbaObj.b, rgbaObj.a);
    }
    throw new Error(`The requested "${format}" color format is not supported for now...`);
}
//# sourceMappingURL=convert.js.map