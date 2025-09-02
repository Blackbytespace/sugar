import { type TCommonFileExtensionsSettings } from './commonFileExtensions.js';

/**
 * @name            commonVideoFileExtensions
 * @namespace       shared.extension
 * @type            Function
 * @platform        node
 * @platform        js
 * @status          stable
 *
 * This function allows you to get an array of common text file extensions with or without the dot
 * Common formats includes: mp4, avi, mkv, mov, wmv, flv, webm, m4v, mpg, mpeg, 3gp, 3g2, vob, ts, mts, m2ts, ogv, divx, xvid, asf
 * Extended formats includes: h264, h265, rm, rmvb, swf, f4v, f4p, f4a, f4b, mod, tod, mxf, r3d, braw, prores, dnxhd, avchd, mks, mk3d, dav, dat, 'dvrms, evo, ifo, ivf, m1v, m2v, m4p, mp2v, mpe, mpv, mpv2, mqv, nsv, nuv, ogg, qt, ram, rec, rv, smk, thp, vc1, vfw, vid, vivo, vp6, vp7, vp8, vp9, wm, wmp, wvx, yuv
 *
 * @param       {TCommonFileExtensionsSettings}           [settings={}]         Settings to customize the function behavior
 * @return      {Array<String>}                           The array of extensions
 *
 * @setting     {boolean}         [dot=false]         If true, the dot will be added to the extension
 * @setting     {Array<String>}   [exclude=[]]        An array of extensions to exclude
 * @setting     {boolean}         [extended=false]    If true, the extended formats will be included *
 *
 * @snippet         __commonVideoFileExtensions()
 *
 * @example         js
 * import { __commonVideoFileExtensions } from '@blackbyte/sugar/extension';
 * const extensions = __commonVideoFileExtensions();
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __commonVideoFileExtensions(
  settings: Partial<TCommonFileExtensionsSettings> = {},
): string[] {
  const finalSettings: TCommonFileExtensionsSettings = {
    dot: false,
    exclude: [],
    extended: false,
    ...settings,
  };

  const commons = [
    'mp4',
    'avi',
    'mkv',
    'mov',
    'wmv',
    'flv',
    'webm',
    'm4v',
    'mpg',
    'mpeg',
    '3gp',
    '3g2',
    'vob',
    'ts',
    'mts',
    'm2ts',
    'ogv',
    'divx',
    'xvid',
    'asf',
  ];

  const extended = [
    'h264',
    'h265',
    'rm',
    'rmvb',
    'swf',
    'f4v',
    'f4p',
    'f4a',
    'f4b',
    'mod',
    'tod',
    'mxf',
    'r3d',
    'braw',
    'prores',
    'dnxhd',
    'avchd',
    'mks',
    'mk3d',
    'dav',
    'dat',
    'dvr-ms',
    'evo',
    'ifo',
    'ivf',
    'm1v',
    'm2v',
    'm4p',
    'mp2v',
    'mpe',
    'mpv',
    'mpv2',
    'mqv',
    'nsv',
    'nuv',
    'ogg',
    'qt',
    'ram',
    'rec',
    'rv',
    'smk',
    'thp',
    'vc1',
    'vfw',
    'vid',
    'vivo',
    'vp6',
    'vp7',
    'vp8',
    'vp9',
    'wm',
    'wmp',
    'wvx',
    'yuv',
  ];

  return [...commons, ...(finalSettings.extended ? extended : [])]
    .filter((ext) => !finalSettings.exclude.includes(ext))
    .map((ext) => (finalSettings.dot ? `.${ext}` : ext));
}
