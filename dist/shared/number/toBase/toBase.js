/**
 * @name                toBase
 * @namespace           shared.number
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Convert a number to another base between 1 and the length of the "chars" settings
 *
 * @param       {Number}        number      The number to convert
 * @param       {Number}        base         The base to convert to
 * @return      {String}                    The converted number in string format
 *
 * @setting         {String}        [chars='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789']          The characters set to use for conversion
 *
 * @todo      tests
 *
 * @snippet         toBase($1, $2)
 *
 * @example    js
 * import { toBase } from '@blackbyte/sugar/number'
 * toBase(1024, 62); // qF
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function toBase(num, base, settings) {
    settings = Object.assign({ chars: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }, (settings !== null && settings !== void 0 ? settings : {}));
    const symbols = settings.chars.split('');
    let conversion = '';
    if (num <= 0) {
        return symbols[0];
    }
    if (base > symbols.length || base <= 1) {
        base = symbols.length;
    }
    while (num >= 1) {
        conversion = symbols[num - base * Math.floor(num / base)] + conversion;
        num = Math.floor(num / base);
    }
    return `${base < 11 ? parseInt(conversion) : conversion}`;
}
//# sourceMappingURL=toBase.js.map