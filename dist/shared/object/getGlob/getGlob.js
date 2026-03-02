import { minimatch as __minimatch } from 'minimatch';
import unflatten from './unflatten.js';
import flatten from './flatten.js';
export default function getGlob(obj, glob, settings = {}) {
    settings = Object.assign({ unflatten: true }, settings);
    const flat = flatten(obj);
    const resultObj = {};
    Object.keys(flat).forEach((path) => {
        if (__minimatch(path, glob)) {
            resultObj[path] = flat[path];
        }
    });
    if (settings.unflatten === true)
        return unflatten(resultObj);
    return resultObj;
}
//# sourceMappingURL=getGlob.js.map