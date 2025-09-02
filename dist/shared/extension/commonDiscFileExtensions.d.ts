import { type TCommonFileExtensionsSettings } from './commonFileExtensions.js';
/**
 * @name            commonDiscFileExtensions
 * @namespace       shared.extension
 * @type            Function
 * @platform        node
 * @platform        js
 * @status          stable
 *
 * This function allows you to get an array of common text file extensions with or without the dot
 * Common formats includes: iso, dmg, img, bin, cue, nrg, mdf, mds, toast, vcd, cdi, b5t, b6t, bwt, ccd, clone, dao, tao.
 * Extended formats includes: c2d, cif, fcd, p01, pdi, pxi, xmd, gi, pqi, disc, ratdvd, sdi, xdi, mdx, ashdisk, bif, daa, dao, dvd, fdi, gbi, ima, lcd, md0, md1, md2, ncd, pvm, vcm, vdi, vhd, vmdk, wim, xva.
 *
 * @param       {TCommonFileExtensionsSettings}           [settings={}]         Settings to customize the function behavior
 * @return      {Array<String>}                           The array of extensions
 *
 * @setting     {boolean}         [dot=false]         If true, the dot will be added to the extension
 * @setting     {Array<String>}   [exclude=[]]        An array of extensions to exclude
 * @setting     {boolean}         [extended=false]    If true, the extended formats will be included *
 *
 * @snippet         __commonDiscFileExtensions()
 *
 * @example         js
 * import { __commonDiscFileExtensions } from '@blackbyte/sugar/extension';
 * const extensions = __commonDiscFileExtensions();
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __commonDiscFileExtensions(settings?: Partial<TCommonFileExtensionsSettings>): string[];
