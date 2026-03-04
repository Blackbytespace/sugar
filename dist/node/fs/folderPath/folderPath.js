import * as fs from 'fs';
export default function folderPath(path, settings) {
    const finalSettings = Object.assign({ checkExistence: false }, (settings !== null && settings !== void 0 ? settings : {}));
    if (finalSettings.checkExistence) {
        if (!fs.existsSync(path))
            return '';
    }
    const parts = path.split('/');
    if (parts.length <= 1) {
        return '';
    }
    return parts.slice(0, -1).join('/');
}
//# sourceMappingURL=folderPath.js.map