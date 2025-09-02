/**
 * @name                commonFontFileExtensions
 * @namespace           shared.extension
 * @type                Function
 * @platform            node
 * @platform            js
 * @status              stable
 *
 * This function allows you to get an array of common text file extensions with or without the dot
 * Common formats includes: ttf, otf, woff, woff2, eot
 * Extended formats includes: fnt, fon, pfb, pfm, afm, bdf, pcf, snf, pfa, gsf, cff, otc, ttc, dfont, suit, lwfn, ffil, pdb, etx, gdr, cha, chr, bmap, fdb, fd, pk, gf, mf, vf, tfm, ofm, ufm, wfn, fft, sfd, ufo, glif.
 *
 * @param       {TCommonFileExtensionsSettings}           [settings={}]         Settings to customize the function behavior
 * @return      {Array<String>}                           The array of extensions
 *
 * @setting     {boolean}         [dot=false]         If true, the dot will be added to the extension
 * @setting     {Array<String>}   [exclude=[]]        An array of extensions to exclude
 * @setting     {boolean}         [extended=false]    If true, the extended formats will be included *
 *
 * @snippet         __commonFontFileExtensions()
 *
 * @example         js
 * import { __commonFontFileExtensions } from '@blackbyte/sugar/extension';
 * const extensions = __commonFontFileExtensions();
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __commonFontFileExtensions(settings = {}) {
    const finalSettings = Object.assign({ dot: false, exclude: [], extended: false }, settings);
    const commons = ['ttf', 'otf', 'woff', 'woff2', 'eot'];
    const extended = [
        'fnt',
        'fon',
        'pfb',
        'pfm',
        'afm',
        'bdf',
        'pcf',
        'snf',
        'pfa',
        'gsf',
        'cff',
        'otc',
        'ttc',
        'dfont',
        'suit',
        'lwfn',
        'ffil',
        'pdb',
        'etx',
        'gdr',
        'cha',
        'chr',
        'bmap',
        'fdb',
        'fd',
        'pk',
        'gf',
        'mf',
        'vf',
        'tfm',
        'ofm',
        'ufm',
        'wfn',
        'fft',
        'sfd',
        'ufo',
        'glif',
    ];
    return ['fnt', 'fon', 'otf', 'ttf', 'woff', 'woff2']
        .filter((ext) => !finalSettings.exclude.includes(ext))
        .map((ext) => (finalSettings.dot ? `.${ext}` : ext));
}
//# sourceMappingURL=commonFontFileExtensions.js.map