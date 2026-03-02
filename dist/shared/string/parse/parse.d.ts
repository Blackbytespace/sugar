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
export default function parse(value: string): any;
