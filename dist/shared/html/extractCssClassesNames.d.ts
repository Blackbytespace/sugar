/**
 * @name            extractCssClassesNames
 * @namespace       shared.html
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * This function allows you to extract all the classes names from a passed html string.
 * You can use it with other things than html but depending on the complexity of your string, it may not
 * work as expected...
 *
 * @param     {String}          html          The HTML to process.
 * @return    {String[]}                      The finded css classes names
 *
 * @setting         {Boolean}       [expandPleasantCssClassname=true]       Specify if you want to expand the pleasant css classes names like "s-typo:p" to "s-typo--p"
 *
 * @snippet         extractCssClassesNames($1)
 *
 * @example         js
 * import { extractCssClassesNames } from '@blackbyte/sugar/html';
 * extractCssClassesNames('...');
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TExtractCssClassesNamesSettings = {
    expandPleasantCssClassname?: boolean;
    includeIds?: boolean;
};
export default function extractCssClassesNames(html: string, settings?: Partial<TExtractCssClassesNamesSettings>): string[];
