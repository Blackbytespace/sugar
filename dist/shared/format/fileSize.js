import { filesize as __filesize } from 'filesize';
export default function formatFileSize(size, settings = {}) {
    // @ts-ignore
    return __filesize(size, settings);
}
//# sourceMappingURL=fileSize.js.map