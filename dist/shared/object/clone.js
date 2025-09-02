import __clone from 'lodash.clone';
import deepClone from 'lodash.clonedeep';
export default function clone(object, settings = {}) {
    settings = Object.assign({ deep: false }, settings);
    if (settings.deep) {
        return deepClone(object);
    }
    return __clone(object);
}
//# sourceMappingURL=clone.js.map