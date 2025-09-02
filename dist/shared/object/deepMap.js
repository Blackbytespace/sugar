import isClassInstance from '../is/isClassInstance.js';
import isPlainObject from '../is/isPlainObject.js';
import clone from './clone.js';
export default function deepMap(objectOrArray, processor, settings, _path = []) {
    settings = Object.assign({ classInstances: false, array: true, clone: false, privateProps: true }, settings);
    const isArray = Array.isArray(objectOrArray);
    let newObject = isArray
        ? []
        : (settings === null || settings === void 0 ? void 0 : settings.clone)
            ? clone(objectOrArray, { deep: true })
            : objectOrArray;
    Object.keys(objectOrArray).forEach((prop) => {
        if (!(settings === null || settings === void 0 ? void 0 : settings.privateProps) && prop.match(/^_/))
            return;
        if (isPlainObject(objectOrArray[prop]) ||
            (isClassInstance(objectOrArray[prop]) && (settings === null || settings === void 0 ? void 0 : settings.classInstances)) ||
            (Array.isArray(objectOrArray[prop]) && (settings === null || settings === void 0 ? void 0 : settings.array))) {
            const res = deepMap(objectOrArray[prop], processor, Object.assign(Object.assign({}, settings), { clone: false }), 
            // @ts-ignore
            [..._path, prop]);
            if (isArray) {
                newObject.push(res);
            }
            else {
                if (prop === '...' && isPlainObject(res)) {
                    newObject = Object.assign(Object.assign({}, newObject), res);
                }
                else {
                    newObject[prop] = res;
                }
            }
            return;
        }
        const res = processor === null || processor === void 0 ? void 0 : processor({
            object: objectOrArray,
            prop,
            value: objectOrArray[prop],
            path: [..._path, prop].join('.'),
        });
        if (res === -1) {
            delete newObject[prop];
            return;
        }
        if (isArray) {
            newObject.push(res);
        }
        else {
            if (prop === '...' && isPlainObject(res)) {
                // console.log('DEFEF', res);
                newObject = Object.assign(Object.assign({}, newObject), res);
            }
            else {
                newObject[prop] = res;
            }
        }
    });
    return newObject;
}
//# sourceMappingURL=deepMap.js.map