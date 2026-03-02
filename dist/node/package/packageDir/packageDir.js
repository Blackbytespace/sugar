import fs from 'fs';
import path from 'path';
import nodeModulesDir from './nodeModulesDir.js';
export default function packageDir(nameOrPath, settings) {
    settings = Object.assign({ cwd: process.cwd(), monorepo: false, checkExistence: true }, (settings !== null && settings !== void 0 ? settings : {}));
    // absolute path
    if (fs.existsSync(`${nameOrPath}/package.json`)) {
        return path.resolve(nameOrPath);
    }
    const vendorDir = nodeModulesDir(settings);
    // current package dir "."
    if (nameOrPath === '.') {
        return path.resolve(`${vendorDir}/../`);
    }
    if (settings.checkExistence &&
        !fs.existsSync(`${vendorDir}/${nameOrPath}/package.json`)) {
        throw new Error(`The NPM package "<yellow>${nameOrPath}</yellow>" seems to not exists...`);
    }
    return `${vendorDir}/${nameOrPath}`;
}
//# sourceMappingURL=packageDir.js.map