var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __path from 'path';
import tmpDir from 'temp-dir';
import uniqid from '../../node/string/uniqid.js';
import toString from '../../shared/string/toString.js';
import writeFileSync from './writeFileSync.js';
export default function writeTmpFile(data_1) {
    return __awaiter(this, arguments, void 0, function* (data, settings = {}) {
        var _a;
        settings = Object.assign({ path: undefined }, settings);
        let path = __path.resolve(tmpDir, (_a = settings.path) !== null && _a !== void 0 ? _a : uniqid() + '.tmp');
        writeFileSync(path, toString(data));
        return path;
    });
}
//# sourceMappingURL=writeTmpFile.js.map