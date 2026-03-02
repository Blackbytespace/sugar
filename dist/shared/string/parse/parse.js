/**
 * @name                            parse
 * @namespace                       shared.string
 * @type                            Function
 * @platform                        js
 * @platform                        node
 * @status                          stable
 *
 * Parse a string and convert it into his native data type like date, number, boolean, etc...
 * This function take care of the following types:
 * - boolean
 * - number
 * - null
 * - undefined
 * - json
 *
 * @param             {String}                        value                                 The value to convert
 * @return            {Mixed}                                                               The converted value
 *
 * @todo      tests
 *
 * @snippet         parse($1)
 *
 * @example           js
 * import { parse } from '@blackbyte/sugar/string';
 *  parse('10'); // => 10
 *
 * @since     1.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function parse(value) {
    // if the value is not a string
    // return it as he's
    if (typeof value !== 'string')
        return value;
    // true | false | null | undefined
    if (value.toLowerCase() === 'true')
        return true;
    if (value.toLowerCase() === 'false')
        return false;
    if (value.toLowerCase() === 'null')
        return null;
    if (value.toLowerCase() === 'undefined')
        return undefined;
    // small dirty hack
    value = value.split('⠀').join('').trim();
    // check if is a number
    const number = Number(value);
    const isNumber = !isNaN(number);
    if (isNumber) {
        // if the number is an integer
        if (Number.isInteger(number)) {
            return number;
        }
        // if the number is a float
        return parseFloat(value);
    }
    // // check if is a date
    // const date = new Date(value);
    // const isDate = date.toString() !== 'Invalid Date';
    // if (isDate) {
    //   return date;
    // }
    // check if is a json
    try {
        const json = JSON.parse(value);
        if (json) {
            return json;
        }
    }
    catch (e) { }
    // return the value as a string
    return value;
}
//# sourceMappingURL=parse.js.map