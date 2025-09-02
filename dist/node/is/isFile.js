import * as __fs from 'fs';
export default function isFile(path, settings = {}) {
    settings = Object.assign({ symlink: true }, settings);
    let isMatching = __fs.existsSync(path);
    if (!isMatching)
        return false;
    if (settings.symlink && __fs.lstatSync(path).isSymbolicLink()) {
        const realPath = __fs.realpathSync(path);
        isMatching = isMatching && __fs.lstatSync(realPath).isFile();
    }
    else {
        isMatching = isMatching && __fs.lstatSync(path).isFile();
    }
    return isMatching;
}
//# sourceMappingURL=isFile.js.map