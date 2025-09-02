import * as fs from 'fs';
import micromatch from 'micromatch';
export default function pickOneSync(filesNames, settings) {
    const finalSettings = Object.assign({ cwd: process.cwd() }, (settings !== null && settings !== void 0 ? settings : {}));
    let result = '';
    // check if we have a file
    const files = fs.readdirSync(finalSettings.cwd);
    for (const fileName of files) {
        if (micromatch.isMatch(fileName, filesNames)) {
            result = `${finalSettings.cwd}/${fileName}`;
            break;
        }
    }
    return result;
}
//# sourceMappingURL=pickOneSync.js.map