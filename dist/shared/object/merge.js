/**
 * @name                merge
 * @namespace           shared.object
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Merge one object with another and return the merged object result. This merging implementation support:
 * - Merging object with getters/setters
 * - n numbers of objects as arguments
 *
 * @param           {Object}            args...        Pass all the objects you want to merge
 * @return          {Object}                              The merged object result
 *
 * @todo      tests
 *
 * @snippet         merge($1, $2)
 *
 * @example           js
 * import { merge } from '@blackbyte/sugar/object';
 * merge({a: 'hello'}, {a: 'plop', hello: 'world');
 *
 * @since       1.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
function _merge(firstObj, secondObj) {
    const newObj = {};
    if (!firstObj && secondObj)
        return secondObj;
    if (!secondObj && firstObj)
        return firstObj;
    if (!firstObj && !secondObj)
        return {};
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
        const desc = Object.getOwnPropertyDescriptor(secondObj, key);
        if ((desc === null || desc === void 0 ? void 0 : desc.set) || (desc === null || desc === void 0 ? void 0 : desc.get)) {
            Object.defineProperty(newObj, key, desc);
        }
        else {
            newObj[key] = secondObj[key];
        }
    });
    return newObj;
}
export default function (...args) {
    let currentObj = {};
    for (let i = 0; i < args.length; i++) {
        const toMergeObj = args[i];
        currentObj = _merge(currentObj, toMergeObj);
    }
    return currentObj;
}
//# sourceMappingURL=merge.js.map