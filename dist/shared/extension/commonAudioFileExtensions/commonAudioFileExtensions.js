/**
 * @name            commonAudioFileExtensions
 * @namespace       shared.extension
 * @type            Function
 * @platform        node
 * @platform        js
 * @status          stable
 *
 * This function allows you to get an array of common text file extensions with or without the dot
 * Common formats includes: mp3, wav, flac, aac, m4a, ogg, wma, opus, aiff, alac, ape, webm, ac3, dts, amr, mid, midi, cda, ra, au, voc, gsm, pcm
 * Extended formats includes: 3gp, 8svx, aa, aax, ac4, act, aif, amv, awb, awg, bwf, caf, dct, dff, dsf, dss, dvf, dxd, eac3, ec3, flv, iklax, it, ivs, kar, la, m1a, m2a, m3u, m3u8, m4b, m4p, mka, mld, mlp, mmf, mod, mogg, mp2, mpa, mpc, mpp, mpu, msv, nmf, oga, ogm, ogv, ogx, pls, ram, raw, rax, rf64, rmi, s3m, saf, sd2, shn, sln, smp, snd, spx, tak, thd, tta, vox, vqf, w64, wax, wm, wmv, wpl, wv, wvx, xa, xm, xspf
 *
 * @param       {TCommonFileExtensionsSettings}           [settings={}]         Settings to customize the function behavior
 * @return      {Array<String>}                           The array of extensions
 *
 * @setting     {boolean}         [dot=false]         If true, the dot will be added to the extension
 * @setting     {Array<String>}   [exclude=[]]        An array of extensions to exclude
 * @setting     {boolean}         [extended=false]    If true, the extended formats will be included
 *
 * @snippet         commonAudioFileExtensions()
 *
 * @example         js
 * import { commonAudioFileExtensions } from '@blackbyte/sugar/extension';
 * const extensions = commonAudioFileExtensions();
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function commonAudioFileExtensions(settings = {}) {
    const finalSettings = Object.assign({ dot: false, exclude: [], extended: false }, settings);
    const commons = [
        'mp3',
        'wav',
        'flac',
        'aac',
        'm4a',
        'ogg',
        'wma',
        'opus',
        'aiff',
        'alac',
        'ape',
        'webm',
        'ac3',
        'dts',
        'amr',
        'mid',
        'midi',
        'cda',
        'ra',
        'au',
        'voc',
        'gsm',
        'pcm',
    ];
    const extended = [
        '3gp',
        '8svx',
        'aa',
        'aax',
        'ac4',
        'act',
        'aif',
        'amv',
        'awb',
        'awg',
        'bwf',
        'caf',
        'dct',
        'dff',
        'dsf',
        'dss',
        'dvf',
        'dxd',
        'eac3',
        'ec3',
        'flv',
        'iklax',
        'it',
        'ivs',
        'kar',
        'la',
        'm1a',
        'm2a',
        'm3u',
        'm3u8',
        'm4b',
        'm4p',
        'mka',
        'mld',
        'mlp',
        'mmf',
        'mod',
        'mogg',
        'mp2',
        'mpa',
        'mpc',
        'mpp',
        'mpu',
        'msv',
        'nmf',
        'oga',
        'ogm',
        'ogv',
        'ogx',
        'pls',
        'ram',
        'raw',
        'rax',
        'rf64',
        'rmi',
        's3m',
        'saf',
        'sd2',
        'shn',
        'sln',
        'smp',
        'snd',
        'spx',
        'tak',
        'thd',
        'tta',
        'vox',
        'vqf',
        'w64',
        'wax',
        'wm',
        'wmv',
        'wpl',
        'wv',
        'wvx',
        'xa',
        'xm',
        'xspf',
    ];
    return [...(finalSettings.extended ? extended : []), ...commons]
        .filter((ext) => !finalSettings.exclude.includes(ext))
        .map((ext) => (finalSettings.dot ? `.${ext}` : ext));
}
//# sourceMappingURL=commonAudioFileExtensions.js.map