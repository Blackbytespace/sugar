import hslaToRgba from '../hslaToRgba/hslaToRgba.js';
import parseColor from '../parseColor/parseColor.js';
import rgbaToHex from '../rgbaToHex/rgbaToHex.js';
import rgbaToHsla from '../rgbaToHsla/rgbaToHsla.js';
export default function convertColor(input, format = 'rgba') {
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
            rgbaObj = Object.assign(Object.assign({}, input), { toString: () => {
                    var _a;
                    return `rgba(${input.r}, ${input.g}, ${input.b}, ${(_a = input.a) !== null && _a !== void 0 ? _a : 1})`;
                } });
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
                toString() {
                    return `rgb(${rgbaObj.r}, ${rgbaObj.g}, ${rgbaObj.b})`;
                },
            };
        case 'rgba':
            return rgbaObj;
        case 'hsl':
            return {
                h: hslaObj.h,
                s: hslaObj.s,
                l: hslaObj.l,
                toString() {
                    return `hsl(${hslaObj.h}, ${hslaObj.s}%, ${hslaObj.l}%)`;
                },
            };
        case 'hsla':
            return hslaObj;
        case 'hex':
            return rgbaToHex(rgbaObj.r, rgbaObj.g, rgbaObj.b, rgbaObj.a);
    }
    throw new Error(`The requested "${format}" color format is not supported for now...`);
}
//# sourceMappingURL=convertColor.js.map