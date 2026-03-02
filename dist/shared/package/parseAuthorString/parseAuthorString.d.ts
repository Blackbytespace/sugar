/**
 * @name                    parseAuthorString
 * @namespace               shared.package
 * @type                    Function
 * @platform                js
 * @platform                node
 * @status                  stable
 *
 * This function simply take an author string like "Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)" and
 * transform it into a plain object with these properties: name, email and url
 *
 * @param       {String}          string          The string to parse
 * @return      {Object}                          The plain object version of the string
 *
 * @todo      tests
 *
 * @snippet         parseAuthorString($1)
 *
 * @example       js
 * import { parseAuthorString } from '@blackbyte/sugar/package';
 *  parseAuthorString("Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)")
 * // => {
 *   "name": "Olivier Bossel",
 *   "email": "olivier.bossel@gmail.com",
 *   "url": "https://olivierbossel.com"
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TParseAuthorStringResult = {
    name: string;
    email: string;
    url: string;
};
export default function parseAuthorString(string: string): TParseAuthorStringResult;
