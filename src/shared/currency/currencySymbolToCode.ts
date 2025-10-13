import currencySymbolMap from 'currency-symbol-map';

/**
 * @name              currencySymbolToCode
 * @namespace         shared.currency
 * @type              Function
 * @platform          js
 * @platform          node
 * @status            stable
 *
 * This function return the currency code like "USD" from a symbol like "$"
 *
 * @param       {String}            symbol              The currency symbol to get the code from
 * @return      {String}                                The currency code
 *
 * @snippet         currencySymbolToCode($1)
 *
 * @example       js
 * import { currencySymbolToCode } from '@blackbyte/sugar/currency';
 * currencySymbolToCode('$'); // => USD
 *
 * @see       https://www.npmjs.com/package/currency-symbol-map
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function currencySymbolToCode(symbol: string): string {
  // clean passed symbol
  symbol = symbol.trim();

  // @ts-ignore
  const symbolMap = currencySymbolMap.currencySymbolMap as any;

  // return the symbol
  return (
    Object.keys(symbolMap).find((key) => symbolMap[key] === symbol) ?? ''
  ).toUpperCase();
}
