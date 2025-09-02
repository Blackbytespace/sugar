import unique from '../array/unique.js';
import commonAudioFileExtensions from './commonAudioFileExtensions.js';
import commonImageFileExtensions from './commonImageFileExtensions.js';
import commonVideoFileExtensions from './commonVideoFileExtensions.js';
/**
 * @name            commonMediaFileExtensions
 * @namespace       shared.extension
 * @type            Function
 * @platform        node
 * @platform        js
 * @status          stable
 *
 * This function allows you to get an array of common media file extensions with or without the dot
 *
 * @param       {TCommonFileExtensionsSettings}           [settings={}]         Settings to customize the function behavior
 * @return      {Array<String>}                           The array of extensions
 *
 * @setting     {boolean}         [dot=false]         If true, the dot will be added to the extension
 * @setting     {Array<String>}   [exclude=[]]        An array of extensions to exclude
 * @setting     {boolean}         [extended=false]    If true, the extended formats will be included *
 *
 * @snippet         __commonMediaFileExtensions()
 *
 * @example         js
 * import { __commonMediaFileExtensions } from '@blackbyte/sugar/extension';
 * const extensions = __commonMediaFileExtensions(); // => ['avi','mp3',...]
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __commonMediaFileExtensions(settings = {}) {
    const finalSettings = Object.assign({ dot: false, exclude: [], extended: false }, settings);
    return unique([
        ...commonImageFileExtensions(finalSettings),
        ...commonVideoFileExtensions(finalSettings),
        ...commonAudioFileExtensions(finalSettings),
    ])
        .filter((ext) => !finalSettings.exclude.includes(ext))
        .map((ext) => (finalSettings.dot ? `.${ext}` : ext));
}
//# sourceMappingURL=commonMediaFileExtensions.js.map