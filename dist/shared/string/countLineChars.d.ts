/**
 * @name                            countLineChars
 * @namespace                       shared.string
 * @type                            Function
 * @platform                        js
 * @platform                        node
 * @status                          stable
 *
 * Count how many characters their is in the passed line.
 * This function will exclude the characters like the html tags like <red>, etc...
 *
 * @param           {String}              line              The line to count
 * @param           {Object}              [count={}]        Specify what you want to count outside of the normal characters of yourse. Here's the list of available options:
 * - htmlTags (false) {Boolean}: Specify if you want to count the html tags or not
 * - terminalSpecialChars (false) {Boolean}: Specify if you want to count the terminal specials chars like "\u001b[30m", etc...
 * - newLineChars (false) {Boolean}: Specify if you want to count the new line special char "\n" or not
 * @return          {Number}                                How many characters their is in the line
 *
 * @setting         {Boolean}          [htmlTags=false]         Specify if you want to count the html tags or not
 * @setting         {Boolean}          [terminalSpecialChars=false]         Specify if you want to count the terminal specials chars like "\u001b[30m", etc...
 * @setting         {Boolean}          [newLineChars=false]         Specify if you want to count the new line special char "\n" or not
 *
 * @todo      tests
 *
 * @snippet         countLineChars($1)
 *
 * @example         js
 * import { countLineChars } from '@blackbyte/sugar/string';
 *  countLineChars('Hello <red>World</red>'); // 11
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TCountLineCharsSettings = {
    htmlTags?: boolean;
    terminalSpecialChars?: boolean;
    newLineChars?: boolean;
};
export default function countLineChars(line: string, count?: TCountLineCharsSettings): number;
