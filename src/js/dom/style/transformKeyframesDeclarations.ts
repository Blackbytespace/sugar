import parseKeyframeKey from '../../../shared/css/parse/parseKeyframeKey.js';
import removeVendorPrefix from '../../../shared/css/rule/removeVendorPrefix.js';
import camelCase from '../../../shared/string/camelCase.js';
import getDefinedStyles from './getDefinedStyles.js';

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

function normalizePropertyName(propertyName) {
  return camelCase(removeVendorPrefix(propertyName));
}

export default function transformKeyframeDeclaration(
  keyFrameRule,
): TTransformedKeyframeDeclaration[] {
  // Convert keyFrame.keyText to integers holding percentage of keyframe
  const percentages = parseKeyframeKey(keyFrameRule.keyText);
  const style = getDefinedStyles(keyFrameRule.style);

  // Normalize to unprefixed styles
  const normalizedStyles = Object.keys(style).reduce((result, propertyName) => {
    const name = normalizePropertyName(propertyName);
    result[name] = style[propertyName];
    return result;
  }, {});

  return percentages.map((percentage) => {
    return {
      percentage,
      // Convert percentage to fraction of 1 for webanimation compat
      offset: percentage / 100,
      // Mixin with extracted keyframe styling
      rules: normalizedStyles,
    };
  });
}
