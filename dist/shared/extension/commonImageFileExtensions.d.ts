import { type TCommonFileExtensionsSettings } from './commonFileExtensions.js';
/**
 * @name            commonImageFileExtensions
 * @namespace       shared.extension
 * @type            Function
 * @platform        node
 * @platform        js
 * @status          stable
 *
 * This function allows you to get an array of common text file extensions with or without the dot
 * Common formats includes: jpg, jpeg, png, gif, bmp, svg, webp, ico, tiff, tif
 * Extended formats includes: psd, ai, ps, avif, heic, heif, raw, cr2, nef, orf, sr2, arw, dng, rw2, raf, pef, x3f, crw, mrw, dcr, kdc, srf, erf, 3fr, mef, mos, ptx, r3d, fff, iiq, rwl, rwz, bay, cap, dcs, dcx, eip, emf, eps, exr, fax, fpx, g3, hdr, img, j2c, j2k, jp2, jpc, jpf, jpx.
 *
 * @param       {TCommonFileExtensionsSettings}           [settings={}]         Settings to customize the function behavior
 * @return      {Array<String>}                           The array of extensions
 *
 * @setting     {boolean}         [dot=false]         If true, the dot will be added to the extension
 * @setting     {Array<String>}   [exclude=[]]        An array of extensions to exclude
 * @setting     {boolean}         [extended=false]    If true, the extended formats will be included *
 *
 * @snippet         __commonImageFileExtensions()
 *
 * @example         js
 * import { __commonImageFileExtensions } from '@blackbyte/sugar/extension';
 * const extensions = __commonImageFileExtensions();
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __commonImageFileExtensions(settings?: Partial<TCommonFileExtensionsSettings>): string[];
