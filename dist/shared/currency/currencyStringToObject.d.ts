/**
 * @name              currencyStringToObject
 * @namespace         shared.currency
 * @type              Function
 * @platform          js
 * @platform          node
 * @status            stable
 *
 * This function take a currency string like "120 USD" and convert it to an object
 * containing these properties:
 *
 * - `amount`: 120,
 * - `code`: USD,
 * - `symbol`: $
 *
 * @param       {String}            currency            The currency string to convert
 * @return      {TCurrencyToObject}                     The currency object
 *
 * @snippet         currencyStringToObject($1)
 *
 * @example       js
 * import { currencyStringToObject } from '@blackbyte/sugar/currency';
 * currencyStringToObject('120 $');
 * {
 *   amount: 120,
 *   code: 'USD',
 *   symbol: '$'
 * }
 *
 * @see       https://www.npmjs.com/package/currency-symbol-map
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TCurrencyToObject = {
    amount: number;
    code: string;
    symbol: string;
};
export default function currencyStringToObject(currency: string): TCurrencyToObject;
