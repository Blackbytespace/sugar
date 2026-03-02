import isPlainObject from '../is/isPlainObject.js';
import camelCase from '../string/camelCase.js';
export default function camelCaseProps(object, settings) {
    const finalSettings = Object.assign({ deep: true }, (settings !== null && settings !== void 0 ? settings : {}));
    for (let [key, value] of Object.entries(object)) {
        const newKey = camelCase(key);
        // treat deep
        if (isPlainObject(value) && finalSettings.deep) {
            object[newKey] = camelCaseProps(object[key], finalSettings);
        }
        else {
            object[newKey] = value;
        }
        // delete old key if needed
        if (newKey !== key) {
            delete object[key];
        }
    }
    return object;
}
//# sourceMappingURL=camelCaseProps.js.map