/**
 * @name            highlightText
 * @namespace       shared.string
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * This function allows you to highlight some text in a string or in an HTMLElement
 *
 * @param      {String|HTMLElement}          ctx         The string or HTMLElement in which to highlight the text
 * @param      {String|String[]|RegExp}      search      The text to highlight
 * @return      {String|HTMLElement}                    The processed string or HTMLElement
 *
 * @snippet         highlightText($1, $2)
 *
 * @todo      tests
 *
 * @example         php
 * import { highlightText } from '@blackbyte/sugar/string';
 * highlightText('Hello world', 'llo'); // => He<span class="-highlight">llo</span> world
 *
 * @see         https://markjs.io
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type THighlightTextSettings = {
    class: string;
};
export default function highlightText<T>(ctx: T, search: string | string[] | typeof RegExp, settings?: Partial<THighlightTextSettings>): T;
