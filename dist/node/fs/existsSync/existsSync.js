import * as fs from 'fs';
export default function existsSync(path, settings) {
    const set = Object.assign({ directory: true, file: true, symlink: true }, (settings || {}));
    let isSymlink = false, stats;
    try {
        stats = fs.statSync(path);
        if (!stats)
            return false;
        const realPath = fs.realpathSync(path);
        isSymlink = path !== realPath;
    }
    catch (e) {
        return false;
    }
    if (isSymlink && !set.symlink)
        return false;
    if (stats.isDirectory() && !set.directory)
        return false;
    if (stats.isFile() && !set.file)
        return false;
    return true;
}
//# sourceMappingURL=existsSync.js.map