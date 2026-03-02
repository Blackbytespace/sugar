import hslaToRgba from '../hslaToRgba/hslaToRgba.js';
import parseColor from '../parseColor/parseColor.js';
import rgbaToHex from '../rgbaToHex/rgbaToHex.js';
export default function applyModifiers(input, modifiers = {}) {
    let hsla = parseColor(input, 'hsla');
    // apply modifiers
    for (let [modifier, value] of Object.entries(modifiers)) {
        switch (modifier) {
            case 'lightness':
                if (value < 0)
                    value = 0;
                if (value > 100)
                    value = 100;
                hsla.l = value;
                break;
            case 'lighten':
                hsla.l += value;
                if (hsla.l > 100)
                    hsla.l = 100;
                break;
            case 'darken':
                hsla.l -= value;
                if (hsla.l < 0)
                    hsla.l = 0;
                break;
            case 'saturation':
                if (value < 0)
                    value = 0;
                if (value > 100)
                    value = 100;
                hsla.s = value;
                break;
            case 'saturate':
                hsla.s += value;
                if (hsla.s > 100)
                    hsla.s = 100;
                break;
            case 'desaturate':
                hsla.s -= value;
                if (hsla.s < 0)
                    hsla.s = 0;
                break;
            case 'hue':
                hsla.h = value;
                break;
            case 'spin':
                hsla.h += value;
                while (hsla.h < 0)
                    hsla.h += 360;
                while (hsla.h >= 360)
                    hsla.h -= 360;
                break;
            case 'alpha':
                if (value < 0)
                    value = 0;
                if (value > 1)
                    value = 1;
                hsla.a = value;
                break;
        }
    }
    const rgba = hslaToRgba(hsla.h, hsla.s, hsla.l, hsla.a);
    const hex = rgbaToHex(rgba.r, rgba.g, rgba.b, rgba.a);
    return {
        hex,
        rgba: Object.assign(Object.assign({}, rgba), { string: rgba.toString() }),
        hsla: Object.assign(Object.assign({}, hsla), { string: hsla.toString() }),
    };
}
//# sourceMappingURL=applyModifiers.js.map