import getRotateProperties from './getRotateProperties.js';
import getTranslateProperties from './getTranslateProperties.js';
function getTransformProperties($elm) {
    var _a, _b, _c;
    const rotates = getRotateProperties($elm), translates = getTranslateProperties($elm);
    return {
        translateX: translates.x,
        translateY: translates.y,
        translateZ: translates.z,
        rotateX: (_a = rotates === null || rotates === void 0 ? void 0 : rotates.x) !== null && _a !== void 0 ? _a : 0,
        rotateY: (_b = rotates === null || rotates === void 0 ? void 0 : rotates.y) !== null && _b !== void 0 ? _b : 0,
        rotateZ: (_c = rotates === null || rotates === void 0 ? void 0 : rotates.z) !== null && _c !== void 0 ? _c : 0,
    };
}
export default getTransformProperties;
//# sourceMappingURL=getTransformProperties.js.map