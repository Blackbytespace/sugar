import unique from '../array/unique.js';
import commonAudioFileExtensions from './commonAudioFileExtensions/commonAudioFileExtensions.js';
import commonCompressedFileExtensions from './commonCompressedFileExtensions/commonCompressedFileExtensions.js';
import commonDataFileExtensions from './commonDataFileExtensions/commonDataFileExtensions.js';
import commonDiscFileExtensions from './commonDiscFileExtensions/commonDiscFileExtensions.js';
import commonEmailFileExtensions from './commonEmailFileExtensions/commonEmailFileExtensions.js';
import commonExecutableFileExtensions from './commonExecutableFileExtensions/commonExecutableFileExtensions.js';
import commonFontFileExtensions from './commonFontFileExtensions/commonFontFileExtensions.js';
import commonImageFileExtensions from './commonImageFileExtensions/commonImageFileExtensions.js';
import commonMediaFileExtensions from './commonMediaFileExtensions/commonMediaFileExtensions.js';
import commonProgrammingFileExtensions from './commonProgrammingFileExtensions/commonProgrammingFileExtensions.js';
import commonTextFileExtensions from './commonTextFileExtensions/commonTextFileExtensions.js';
import commonVideoFileExtensions from './commonVideoFileExtensions/commonVideoFileExtensions.js';
import commonWebFileExtensions from './commonWebFileExtensions/commonWebFileExtensions.js';
export default function commonFileExtensions(settings = {}) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    const finalSettings = Object.assign({ types: [
            'audio',
            'compressed',
            'data',
            'disc',
            'email',
            'executable',
            'font',
            'image',
            'media',
            'programming',
            'text',
            'video',
            'web',
        ], dot: false, exclude: [], extended: false }, settings);
    return unique([
        ...(((_a = finalSettings.types) === null || _a === void 0 ? void 0 : _a.includes('audio'))
            ? commonAudioFileExtensions(finalSettings)
            : []),
        ...(((_b = finalSettings.types) === null || _b === void 0 ? void 0 : _b.includes('compressed'))
            ? commonCompressedFileExtensions(finalSettings)
            : []),
        ...(((_c = finalSettings.types) === null || _c === void 0 ? void 0 : _c.includes('data'))
            ? commonDataFileExtensions(finalSettings)
            : []),
        ...(((_d = finalSettings.types) === null || _d === void 0 ? void 0 : _d.includes('disc'))
            ? commonDiscFileExtensions(finalSettings)
            : []),
        ...(((_e = finalSettings.types) === null || _e === void 0 ? void 0 : _e.includes('email'))
            ? commonEmailFileExtensions(finalSettings)
            : []),
        ...(((_f = finalSettings.types) === null || _f === void 0 ? void 0 : _f.includes('executable'))
            ? commonExecutableFileExtensions(finalSettings)
            : []),
        ...(((_g = finalSettings.types) === null || _g === void 0 ? void 0 : _g.includes('font'))
            ? commonFontFileExtensions(finalSettings)
            : []),
        ...(((_h = finalSettings.types) === null || _h === void 0 ? void 0 : _h.includes('image'))
            ? commonImageFileExtensions(finalSettings)
            : []),
        ...(((_j = finalSettings.types) === null || _j === void 0 ? void 0 : _j.includes('media'))
            ? commonMediaFileExtensions(finalSettings)
            : []),
        ...(((_k = finalSettings.types) === null || _k === void 0 ? void 0 : _k.includes('programming'))
            ? commonProgrammingFileExtensions(finalSettings)
            : []),
        ...(((_l = finalSettings.types) === null || _l === void 0 ? void 0 : _l.includes('text'))
            ? commonTextFileExtensions(finalSettings)
            : []),
        ...(((_m = finalSettings.types) === null || _m === void 0 ? void 0 : _m.includes('video'))
            ? commonVideoFileExtensions(finalSettings)
            : []),
        ...(((_o = finalSettings.types) === null || _o === void 0 ? void 0 : _o.includes('web'))
            ? commonWebFileExtensions(finalSettings)
            : []),
    ])
        .filter((ext) => !finalSettings.exclude.includes(ext))
        .map((ext) => (finalSettings.dot ? `.${ext}` : ext));
}
//# sourceMappingURL=commonFileExtensions.js.map