import { isPlainObject } from '@blackbyte/sugar/is';
export default function unique(array, settings) {
    const finalSettings = Object.assign({ stringify: false }, (settings !== null && settings !== void 0 ? settings : {}));
    const a = array.concat();
    for (let i = 0; i < a.length; ++i) {
        for (let j = i + 1; j < a.length; ++j) {
            let valueA = a[i], valueB = a[j];
            // handle "stringify" option
            if (finalSettings.stringify) {
                if (isPlainObject(valueA)) {
                    valueA = JSON.stringify(valueA);
                }
                if (isPlainObject(valueB)) {
                    valueB = JSON.stringify(valueB);
                }
            }
            if (valueA === valueB) {
                a.splice(j--, 1);
            }
        }
    }
    return a;
}
//# sourceMappingURL=unique.js.map