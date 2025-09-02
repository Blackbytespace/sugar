/**
 * @name                unquote
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Remove the quotes of a string
 * Types of quotes removed :
 * - `"`, `'`, `”`, '`'
 *
 * @param    {String}    string    The string to process
 * @param    {TUnquoteSettings}    [settings={}]    Some settings to configure your unquoting process
 * @return    {String}    The unquoted string
 *
 * @todo      tests
 *
 * @snippet         unquote($1)
 *
 * @example    js
 * import { unquote } from '@blackbyte/sugar/string'
 * unquote("'Hello world'") // "Hello world"
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TUnquoteSettings = {
    quotesToRemove: string[];
};
export default function unquote(string: string, settings?: Partial<TUnquoteSettings>): string;
