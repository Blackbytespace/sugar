/**
 * @name            expandPleasantCssClassnames
 * @namespace       shared.html
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * This function allows you to convert "colon" classnames like "s-something:cool @desktop something"
 * to comprehensive classnames for css like "s-something s-something-cool something_desktop", etc...
 *
 * @param     {String}          html          The HTML to process. It can be actually any string values like .vue file, etc...
 * @return    {String}                      The processed string with converted classnames
 *
 * @snippet         expandPleasantCssClassnames($1)
 *
 * @example         js
 * import { expandPleasantCssClassnames } from '@blackbyte/sugar/html';
 * expandPleasantCssClassnames('...');
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function expandPleasantCssClassnames(html: string): string;
