import { hashFileSync } from 'hasha';
export default function fileHashSync(filePath, settings = {}) {
    const finalSettings = Object.assign({ algo: 'sha256', encoding: 'base64' }, (settings !== null && settings !== void 0 ? settings : {}));
    return hashFileSync(filePath, {
        algorithm: finalSettings.algo,
        // @ts-ignore
        encoding: finalSettings.encoding,
    });
}
//# sourceMappingURL=fileHashSync.js.map