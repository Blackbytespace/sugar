/**
 * @name            getCssDeclarations
 * @namespace       js.dom.style
 * @type            Function
 * @platform        js
 * @status          beta
 *
 * Get all the CSSRules of the passed type
 *
 * @param           {string}             [typeName='style']             CSSRule type to search for, valid types: unknown, style, charset, import, media, fontface, page, keyframes, keyframe, namespace, counter, supports, document, fontfeature, viewport, region
 * @param           {array}          [rules=[]]                     Array of CSSRules to search
 * @param           {function}           [predecate=Boolean]        Predecate function to filter matches
 * @return          {array}             Array of matching CSSRules
 *
 * @todo      tests
 *
 * @snippet         getCssDeclarations()
 *
 * @example  	js
 * import { getCssDeclarations } from '@blackbyte/sugar/dom';
 * getCssDeclarations('style', [myCoolCssRules]);
 *
 * @see             https://github.com/marionebl/jogwheel/blob/main/source/library/get-declarations.js
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function getCssDeclarations(typeName?: string, rules?: never[], predecate?: boolean | Function): any[];
