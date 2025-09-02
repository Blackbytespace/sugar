/**
 * @name                transformKeyframesDeclarations
 * @namespace           js.dom.style
 * @type                Function
 * @platform            js
 * @status              beta
 *
 * Transforms KeyFrameRule to array of web animation compatible keyframes
 *
 * @param               {Object}            keyFrameRule                 KeyFrameRule to transform
 * @return              {Array}               Array of webanimation keyframes
 *
 * @snippet         transformKeyframesDeclarations($1)
 *
 * @todo      tests
 *
 * @example  	js
 * import { transformKeyframesDeclarations } from '@blackbyte/sugar/dom';
 *
 * @see             https://github.com/marionebl/jogwheel/blob/main/source/library/transform-keyframe-declaration.js
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TTransformedKeyframeDeclaration = {
    percentage: number;
    offset: number;
    rules: Record<string, any>;
};
export default function transformKeyframeDeclaration(keyFrameRule: any): TTransformedKeyframeDeclaration[];
