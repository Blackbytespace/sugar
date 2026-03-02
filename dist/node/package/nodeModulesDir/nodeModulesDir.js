import fs from 'fs';
import packageRootDir from './packageRootDir.js';
export default function nodeModulesDir(settings) {
    const set = Object.assign({ cwd: process.cwd(), monorepo: false, checkExistence: true }, (settings !== null && settings !== void 0 ? settings : {}));
    let nodeModulesDir = `${packageRootDir(set.cwd, {
        highest: set.monorepo,
    })}/node_modules`;
    if (set.checkExistence && !fs.existsSync(nodeModulesDir)) {
        throw new Error(`The NPM node_modules directory "<yellow>${nodeModulesDir}</yellow>" does not exists...`);
    }
    return nodeModulesDir;
}
//# sourceMappingURL=nodeModulesDir.js.map