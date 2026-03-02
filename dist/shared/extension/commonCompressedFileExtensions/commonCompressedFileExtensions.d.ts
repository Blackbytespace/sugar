import { type TCommonFileExtensionsSettings } from './commonFileExtensions.js';
/**
 * @name            commonCompressedFileExtensions
 * @namespace       shared.extension
 * @type            Function
 * @platform        node
 * @platform        js
 * @status          stable
 *
 * This function allows you to get an array of common text file extensions with or without the dot
 * Common formats includes: zip, rar, 7z, tar, gz, 'targz, tgz, bz2, 'tarbz2, tbz2, xz, 'tarxz, txz, iso, dmg, cab, deb, rpm, pkg, jar, war, apk
 * Extended formats includes: ace, alz, arc, arj, bz, cpio, egg, lha, lz, lzh, lzma, lzo, pak, sit, sitx, 'tar.lz', 'tar.Z', tbz, tlz, tz, tZ, wim, xar, z, zipx
 *
 * @param       {TCommonFileExtensionsSettings}           [settings={}]         Settings to customize the function behavior
 * @return      {Array<String>}                           The array of extensions
 *
 * @setting     {boolean}         [dot=false]         If true, the dot will be added to the extension
 * @setting     {Array<String>}   [exclude=[]]        An array of extensions to exclude
 * @setting     {boolean}         [extended=false]    If true, the extended formats will be included *
 * @snippet         commonCompressedFileExtensions()
 *
 * @example         js
 * import { commonCompressedFileExtensions } from '@blackbyte/sugar/extension';
 * const extensions = commonCompressedFileExtensions();
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function commonCompressedFileExtensions(settings?: Partial<TCommonFileExtensionsSettings>): string[];
