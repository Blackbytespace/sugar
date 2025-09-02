import parseHsla from './parseHsla.js';
/**
 * @name                hslToRgba
 * @namespace           shared.color
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * HSL to RGBA
 *
 * @param	        {Number|String|Object}        	h		        The hue value between 0-360 an object representing h, s, l, (a) or a string representing the hsla(...) color
 * @param	        {Number}        	s 	        	The saturation value between 0-100|0-1
 * @param	        {Number}        	l 	        	The luminence value between 0-100|0-1
 * @param	        {Number}        	a 	        	The alpha value between 0-100|0-1
 * @return 	      {object} 		                  	The rgba object representation with a "toString" method
 *
 * @todo      tests
 *
 * @snippet         hslaToRgba($1)
 *
 * @example         js
 * import { __hslToRgba } from '@blackbyte/sugar/color';
 * __hslToRgba(10,20,30);
 *
 * @see         https://www.npmjs.com/package/colors-convert
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
function HSLAToRGBA(h, s, l, a) {
    // Must be fractions of 1
    s /= 100;
    l /= 100;
    let c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2, r = 0, g = 0, b = 0;
    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    }
    else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    }
    else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    }
    else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    }
    else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    }
    else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    return {
        r,
        g,
        b,
        a,
    };
}
export default function hslaToRgba(h, s, l, a = 1) {
    // string support
    if (typeof h === 'string') {
        if (!h.match(/^hsla?\(/)) {
            throw new Error('<red>[hslaToRgba]</red> When passing a string to the first parameter, it MUST be formatted like: hsla?(.*)');
        }
        h = parseHsla(h);
    }
    // object support
    if (typeof h === 'object') {
        h = h.h;
        s = h.s;
        l = h.l;
        a = h.a;
    }
    const rgba = HSLAToRGBA(h, s, l, a);
    return {
        r: rgba.r,
        g: rgba.g,
        b: rgba.b,
        a: rgba.a !== undefined ? rgba.a : 1, // default alpha to 1 if not provided
        toString: () => {
            return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
        },
    };
}
//# sourceMappingURL=hslaToRgba.js.map