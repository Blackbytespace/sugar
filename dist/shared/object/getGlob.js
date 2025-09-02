import { minimatch as __minimatch } from 'minimatch';
import deepize from './deepize.js';
import flatten from './flatten.js';
export default function getGlob(obj, glob, settings = {}) {
    settings = Object.assign({ deepize: true }, settings);
    const flat = flatten(obj);
    const resultObj = {};
    Object.keys(flat).forEach((path) => {
        if (__minimatch(path, glob)) {
            resultObj[path] = flat[path];
        }
    });
    if (settings.deepize === true)
        return deepize(resultObj);
    return resultObj;
}
//# sourceMappingURL=getGlob.js.map