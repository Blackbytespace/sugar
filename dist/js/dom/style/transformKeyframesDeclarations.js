import parseKeyframeKey from '../../../shared/css/parse/parseKeyframeKey.js';
import removeVendorPrefix from '../../../shared/css/rule/removeVendorPrefix.js';
import camelCase from '../../../shared/string/camelCase.js';
import getDefinedStyles from './getDefinedStyles.js';
function normalizePropertyName(propertyName) {
    return camelCase(removeVendorPrefix(propertyName));
}
export default function transformKeyframeDeclaration(keyFrameRule) {
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
//# sourceMappingURL=transformKeyframesDeclarations.js.map