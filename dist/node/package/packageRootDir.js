import findPkgJson from 'find-package-json';
import fs from 'fs';
import objectHash from '../../shared/object/objectHash.js';
import isFile from '../is/isFile.js';
const packageRootDirsCache = {};
export default function packageRootDir(from = process.cwd(), settings) {
    const finalSettings = Object.assign({ highest: false, upCount: undefined, requiredProperties: ['name', 'version'] }, (settings !== null && settings !== void 0 ? settings : {}));
    // cache
    const storageKey = objectHash(Object.assign({ from }, finalSettings));
    if (!from && packageRootDirsCache[storageKey]) {
        return packageRootDirsCache[storageKey];
    }
    if (isFile(from)) {
        from = from.split('/').slice(0, -1).join('/');
    }
    if (fs.existsSync(`${from}/package.json`)) {
        return from;
    }
    const f = findPkgJson(from);
    let file = f.next();
    let finalFile, upCountIdx = 0;
    // no file found so return the process cwd
    if (!file || !file.filename) {
        return false;
    }
    while (!file.done) {
        if (file.done) {
            break;
        }
        if (finalSettings.upCount && !finalSettings.highest) {
            if (upCountIdx >= finalSettings.upCount) {
                break;
            }
        }
        if (!finalSettings.highest) {
            // required properties
            if (finalSettings.requiredProperties) {
                let allProps = true;
                finalSettings.requiredProperties.forEach((prop) => {
                    if (!allProps)
                        return;
                    if (file.value[prop] === undefined)
                        allProps = false;
                });
                if (allProps) {
                    upCountIdx++;
                    finalFile = file;
                    if (!finalSettings.upCount) {
                        break;
                    }
                }
            }
            else {
                upCountIdx++;
                finalFile = file;
                if (!finalSettings.upCount) {
                    break;
                }
            }
        }
        else {
            finalFile = file;
        }
        file = f.next();
    }
    if (!finalFile) {
        return false;
    }
    const finalPath = finalFile.filename.split('/').slice(0, -1).join('/');
    packageRootDirsCache[storageKey] = finalPath;
    return finalPath;
}
//# sourceMappingURL=packageRootDir.js.map