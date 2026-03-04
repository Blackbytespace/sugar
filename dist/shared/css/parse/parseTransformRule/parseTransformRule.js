import { parse } from '@blackbyte/sugar/string';
export default function parseTransformRule(transformStr) {
    const transforms = transformStr.trim().split(/\) |\)/);
    const result = {
        scale: 1,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
        translateX: 0,
        translateY: 0,
        translateZ: 0,
        rotate: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        skew: 0,
        skewX: 0,
        skewY: 0,
    };
    transforms.forEach((transStr) => {
        if (!transStr || !transStr.trim()) {
            return;
        }
        const parts = transStr.split('('), prop = parts[0].trim(), value = parts[1].trim();
        if (prop.match(/(X|Y|Z)$/)) {
            result[prop] = parse(value);
        }
        else {
            const vals = value.split(',').map((v) => parse(v.trim()));
            // Handle base transform functions (without axis)
            if (vals.length === 1) {
                // Single value base functions like scale(1.5), rotate(45deg)
                if (prop === 'scale') {
                    // For scale, set both the scale property and all axis properties
                    const scaleValue = parse(value);
                    result.scale = scaleValue;
                    result.scaleX = scaleValue;
                    result.scaleY = scaleValue;
                    result.scaleZ = scaleValue;
                }
                else if (prop === 'rotate' || prop === 'skew') {
                    result[prop] = parse(value);
                }
                else {
                    // For other single-value functions, set the X axis
                    result[`${prop}X`] = vals[0];
                }
            }
            else {
                // Multi-value functions like translate(x, y) or scale(x, y)
                ['X', 'Y', 'Z'].forEach((axis, i) => {
                    if (vals[i] !== undefined) {
                        result[`${prop}${axis}`] = vals[i];
                    }
                });
            }
        }
    });
    return result;
}
//# sourceMappingURL=parseTransformRule.js.map