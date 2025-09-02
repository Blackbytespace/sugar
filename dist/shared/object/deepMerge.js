import isPlainObject from '../is/isPlainObject.js';
export default function deepMerge(objects, settings) {
    const finalSettings = Object.assign({ array: false, clone: true }, (settings !== null && settings !== void 0 ? settings : {}));
    function merge(firstObj, secondObj) {
        const newObj = finalSettings.clone ? {} : firstObj;
        if (!secondObj)
            return firstObj;
        const firstProps = Object.getOwnPropertyNames(firstObj);
        firstProps.forEach((key) => {
            const desc = Object.getOwnPropertyDescriptor(firstObj, key);
            if ((desc === null || desc === void 0 ? void 0 : desc.set) || (desc === null || desc === void 0 ? void 0 : desc.get)) {
                Object.defineProperty(newObj, key, desc);
            }
            else {
                newObj[key] = firstObj[key];
            }
        });
        const secondProps = Object.getOwnPropertyNames(secondObj);
        secondProps.forEach((key) => {
            const secondObjDesc = Object.getOwnPropertyDescriptor(secondObj, key);
            if ((secondObjDesc === null || secondObjDesc === void 0 ? void 0 : secondObjDesc.set) || (secondObjDesc === null || secondObjDesc === void 0 ? void 0 : secondObjDesc.get)) {
                Object.defineProperty(newObj, key, secondObjDesc);
            }
            else if (finalSettings.array &&
                Array.isArray(firstObj[key]) &&
                Array.isArray(secondObj[key])) {
                newObj[key] = [...firstObj[key], ...secondObj[key]];
            }
            else if (isPlainObject(newObj[key]) && isPlainObject(secondObj[key])) {
                newObj[key] = merge(newObj[key], secondObj[key]);
            }
            else {
                newObj[key] = secondObj[key];
            }
        });
        return newObj;
    }
    let currentObj = finalSettings.clone ? {} : objects[0];
    for (let i = 0; i < objects.length; i++) {
        const toMergeObj = objects[i];
        currentObj = merge(currentObj, toMergeObj);
    }
    return currentObj;
}
//# sourceMappingURL=deepMerge.js.map