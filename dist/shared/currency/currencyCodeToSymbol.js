import currencySymbolMap from 'currency-symbol-map';
/**
 * @name              currencyCodeToSymbol
 * @namespace         shared.currency
 * @type              Function
 * @platform          js
 * @platform          node
 * @status            stable
 *
 * This function return the currency symbol like "$" from a code like "USD"
 *
 * @param       {String}            code              The currency code to get the symbol from
 * @return      {String}                              The currency symbol
 *
 * @snippet         currencyCodeToSymbol($1)
 *
 * @example       js
 * import { currencyCodeToSymbol } from '@blackbyte/sugar/currency';
 * currencyCodeToSymbol('USD'); // => $
 *
 * @see       https://www.npmjs.com/package/currency-symbol-map
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function currencyCodeToSymbol(code) {
    // clean passed symbol
    code = code.trim().toUpperCase();
    // @ts-ignore
    const symbolMap = currencySymbolMap.currencySymbolMap;
    // return the symbol
    return symbolMap[code];
}
//# sourceMappingURL=currencyCodeToSymbol.js.map