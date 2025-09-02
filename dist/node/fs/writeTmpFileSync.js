import __path from 'path';
import tmpDir from 'temp-dir';
import uniqid from '../../node/string/uniqid.js';
import toString from '../../shared/string/toString.js';
import writeFileSync from './writeFileSync.js';
export default function writeTmpFileSync(data, settings = {}) {
    var _a;
    settings = Object.assign({ path: undefined }, settings);
    let path = __path.resolve(tmpDir, (_a = settings.path) !== null && _a !== void 0 ? _a : uniqid() + '.tmp');
    writeFileSync(path, toString(data));
    return path;
}
//# sourceMappingURL=writeTmpFileSync.js.map