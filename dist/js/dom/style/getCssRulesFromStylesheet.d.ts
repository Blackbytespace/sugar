/**
 * @name            getCssRulesFromStylesheet
 * @namespace       js.dom.style
 * @type            Function
 * @platform        js
 * @status          beta
 *
 * Get all the CSSRules of the passed stylesheet
 *
 * @param       {CSSStyleSheet}     stylesheet      The stylesheet from which to get the CSSRules
 * @param   {Boolean}               [recursive=true]            Specify if you want to get rules from imported css or not
 * @return          {CSSRule[]}             Array of CSSRules
 *
 * @todo      tests
 *
 * @snippet         getCssRulesFromStylesheet($1)
 *
 * @example  	js
 * import { getCssRulesFromStylesheet } from '@blackbyte/sugar/dom';
 * getCssRulesFromStylesheet(myStylesheet);
 *
 * @see             https://github.com/marionebl/jogwheel/blob/main/source/library/get-css-rules.js
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function getCssRulesFromStylesheet(styleSheet: StyleSheet, recursive?: boolean): never[];
