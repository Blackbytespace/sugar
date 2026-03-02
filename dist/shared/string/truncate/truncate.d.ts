/**
 * @name            truncate
 * @namespace       shared.string
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * Truncate a string to a specific length and add an ellipsis at the end
 *
 * @param       {String}        str         The string to truncate
 * @param       {Number}        length      The length to truncate to
 * @param       {Partial<TTruncateSettings>}      [settings={}]       Some settings to configure your truncate process
 * @return     {String}                    The truncated string
 *
 * @setting     {String}        [ellipsis='...']       The ellipsis to add at the end of the truncated string
 *
 * @todo      tests
 *
 * @snippet         truncate($1, $2, $3)
 *
 * @example    js
 * import truncate from '@blackbyte/sugar/string';
 * truncate('Hello world', 5); // => Hello...
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TTruncateSettings = {
    ellipsis: string;
};
export default function truncate(str: string, length: number, settings?: Partial<TTruncateSettings>): string;
