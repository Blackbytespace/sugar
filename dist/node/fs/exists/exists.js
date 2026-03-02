var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as fs from 'fs';
export default function exists(path, settings) {
    return __awaiter(this, void 0, void 0, function* () {
        const set = Object.assign({ directory: true, file: true, symlink: true }, (settings || {}));
        let isSymlink = false, stats;
        try {
            stats = fs.statSync(path);
            if (!stats)
                return false;
            const realPath = fs.realpathSync(path);
            isSymlink = path !== realPath;
        }
        catch (e) { }
        if (isSymlink && !set.symlink)
            return false;
        if (stats.isDirectory() && !set.directory)
            return false;
        if (stats.isFile() && !set.file)
            return false;
        return true;
    });
}
//# sourceMappingURL=exists.js.map