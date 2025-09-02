import fs from 'fs';
import packageRootDir from '../package/packageRootDir.js';
export default function composerVendorDir(settings) {
    const set = Object.assign({ cwd: process.cwd(), monorepo: false, checkExistence: true }, (settings !== null && settings !== void 0 ? settings : {}));
    let vendorDir = `${packageRootDir(set.cwd, {
        highest: set.monorepo,
    })}/vendor`;
    if (set.checkExistence && !fs.existsSync(vendorDir)) {
        throw new Error(`The composer vendors directory "<yellow>${vendorDir}</yellow>" does not exists...`);
    }
    return vendorDir;
}
//# sourceMappingURL=composerVendorDir.js.map