/**
 * @name            simplifySpecialChars
 * @namespace       shared.string
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * This function take a string and replace all the special chars like "é", "à", etc...
 * with their simple version like "a", "e", etc...
 *
 * @param       {String}        str         The string to process
 * @return      {String}                        The processed string
 *
 * @snippet         simplifySpecialChars($1)
 *
 * @todo        tests
 *
 * @example         php
 * import { simplifySpecialChars } from '@blackbyte/sugar/string';
 * simplifySpecialChars('É'); // E
 *
 * @see             https://stackoverflow.com/questions/14114411/remove-all-special-characters-from-a-string/14114443
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function simplifySpecialChars(str: string): string;
