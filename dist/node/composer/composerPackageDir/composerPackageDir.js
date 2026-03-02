import fs from 'fs';
import path from 'path';
import composerVendorDir from './composerVendorDir.js';
export default function composerJsonSync(nameOrPath, settings) {
    settings = Object.assign({ cwd: process.cwd(), monorepo: false, checkExistence: true }, (settings !== null && settings !== void 0 ? settings : {}));
    // absolute path
    if (fs.existsSync(`${nameOrPath}/composer.json`)) {
        return path.resolve(nameOrPath);
    }
    const vendorDir = composerVendorDir(settings);
    // current package dir "."
    if (nameOrPath === '.') {
        return path.resolve(`${vendorDir}/../`);
    }
    if (settings.checkExistence &&
        !fs.existsSync(`${vendorDir}/${nameOrPath}/composer.json`)) {
        throw new Error(`The Composer package "<yellow>${nameOrPath}</yellow>" seems to not exists...`);
    }
    return `${vendorDir}/${nameOrPath}`;
}
//# sourceMappingURL=composerPackageDir.js.map