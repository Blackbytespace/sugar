/**
 * @name            getKeyframesDeclarations
 * @namespace       js.dom.style
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Get all the keyframes declarations from the passed rules
 *
 * @param       {string}            animationName        CSS animationName to search KeyFrameRule declarations for
 * @param       {array}              rules               Array of CSSRules to search
 * @return      {CSSKeyframeRule}              Array of matching KeyFrameRules
 *
 * @todo      tests
 *
 * @snippet         getKeyframesDeclarations($1)
 *
 * @example  	js
 * import { getKeyframesDeclarations } from '@blackbyte/sugar/dom';
 * getKeyframesDeclarations('myCoolAnimation', [myCoolCssRules]);
 *
 * @see             https://github.com/marionebl/jogwheel/blob/main/source/library/get-keyframe-declarations.js
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function getKeyframesDeclarations(animationName: any, rules: any): CSSKeyframeRule[];
