import flatten from './flatten.js';
import __set from './set.js';
export default function deepSearch(object, filter) {
    // make sure the object is a copy
    object = JSON.parse(JSON.stringify(object));
    // flatten the object
    const flatObj = flatten(object);
    const res = {};
    // iterate over the flattened object
    for (let [key, value] of Object.entries(flatObj)) {
        if (filter({ key, value })) {
            __set(res, key, value);
        }
    }
    return res;
}
//# sourceMappingURL=deepSearch.js.map