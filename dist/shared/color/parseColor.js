import hexToRgba from './hexToRgba.js';
import hslaToRgba from './hslaToRgba.js';
import parseHsla from './parseHsla.js';
import parseRgba from './parseRgba.js';
import rgbaToHsla from './rgbaToHsla.js';
export default function parseColor(color, format = 'rgba') {
    color = color.replace(/\s/g, '');
    let parsedColor;
    if (color.startsWith('rgb')) {
        parsedColor = parseRgba(color);
    }
    else if (color.startsWith('hsl')) {
        const hsla = parseHsla(color);
        parsedColor = hslaToRgba(hsla.h, hsla.s, hsla.l);
    }
    else if (color.startsWith('#')) {
        parsedColor = hexToRgba(color);
    }
    else {
        throw new Error(`The passed color "${color}" is in a format that cannot be parsed for now...`);
    }
    switch (format) {
        case 'hsla':
        case 'hsl':
            return rgbaToHsla(parsedColor.r, parsedColor.g, parsedColor.b, parsedColor.a);
            break;
        case 'rgba':
        case 'rgb':
        default:
            return parsedColor;
            break;
    }
}
//# sourceMappingURL=parseColor.js.map