/**
 * @name            expandPleasantCssClassname
 * @namespace       shared.html
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stabée
 *
 * This function allows you to convert "colon" classnames like "s-something:cool @desktop something"
 * to comprehensive classnames for css like "s-something s-something-cool something_desktop", etc...
 *
 * @param     {String}          classesStr          The classes string to convert like "s-typo:h1 s-font:40", etc...
 * @return    {String}                      The processed string with converted classnames
 *
 * @snippet         expandPleasantCssClassname($1)
 *
 * @todo      tests
 *
 * @example         js
 * import { expandPleasantCssClassname } from '@blackbyte/sugar/html';
 * expandPleasantCssClassname('...');
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function expandPleasantCssClassname(classesStr: string): string;
