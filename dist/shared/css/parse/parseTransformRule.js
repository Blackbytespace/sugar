import parse from '../../../shared/string/parse.js';
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
            if (vals.length === 1 && prop === 'scale') {
                result.scale = parseFloat(value);
            }
            else {
                ['X', 'Y', 'Z'].forEach((axis, i) => {
                    if (!vals[i]) {
                        return;
                    }
                    result[`${prop}${axis}`] = vals[i];
                });
            }
        }
    });
    return result;
}
//# sourceMappingURL=parseTransformRule.js.map