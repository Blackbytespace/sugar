/**
 * @name                simply
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * This function take a string with accents, etc and convert it to a more simply
 * version like "éàddö" to "eaddo"
 *
 * @param       {String}        string        The string to simplyfy
 * @param       {Object}        [settings={}]       An object of settings to simplify your string as you want:
 * @return     {String}                        The simplified string
 *
 * @setting    {Boolean}       [specialChars=true]       Specify if you want to get rid of the special chars like é, è, etc...
 * @setting    {Boolean}       [lowerCase=true]          Specify if you want your returned string to be lowercased
 * @setting    {Boolean}       [dashSpace=true]          Specify if you want to replace the "_|-" by a space
 * @setting    {Boolean}       [trim=true}               Specify if you want your string to be trimed or not
 *
 * @todo      tests
 *
 * @snippet         simplify($1)
 *
 * @example       js
 * import { simplify } from '@blackbyte/sugar/string';
 * simplify('éàddö'); // => eaddo
 *
 * @since     1.0.0
 * @author    João Filipe Ventura Coelho <joaoventura93@outlook.com>
 */
export type TSimplifySettings = {
    specialChars?: boolean;
    lowerCase?: boolean;
    dashSpace?: boolean;
    trim?: boolean;
};
export default function simplify(string: string, settings?: TSimplifySettings): string;
