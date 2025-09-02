import { type TCommonFileExtensionsSettings } from './commonFileExtensions.js';

/**
 * @name            commonEmailFileExtensions
 * @namespace       shared.extension
 * @type            Function
 * @platform        node
 * @platform        js
 * @status          stable
 *
 * This function allows you to get an array of common text file extensions with or without the dot
 * Common formats includes: eml, msg, pst, ost, oft, vcf, mbox, emlx, dbx.
 * Extended formats includes: email, emix, mbx, tbb, wab, contact, group, p7m, p7s, smime, winmail.dat, tnef, vcs, vcard, ldif, nws, fol, pmm, pmr, pmi, mmf, msf, snm, bms, ims, mbg, arc, pab, oab, nk2, pip.
 *
 * @param       {TCommonFileExtensionsSettings}           [settings={}]         Settings to customize the function behavior
 * @return      {Array<String>}                           The array of extensions
 *
 * @setting     {boolean}         [dot=false]         If true, the dot will be added to the extension
 * @setting     {Array<String>}   [exclude=[]]        An array of extensions to exclude
 * @setting     {boolean}         [extended=false]    If true, the extended formats will be included * *
 * @snippet         __commonEmailFileExtensions()
 *
 * @example         js
 * import { __commonEmailFileExtensions } from '@blackbyte/sugar/extension';
 * const extensions = __commonEmailFileExtensions();
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __commonEmailFileExtensions(
  settings: Partial<TCommonFileExtensionsSettings> = {},
): string[] {
  const finalSettings: TCommonFileExtensionsSettings = {
    dot: false,
    exclude: [],
    ...settings,
  };

  const commons = [
    'eml',
    'msg',
    'pst',
    'ost',
    'oft',
    'vcf',
    'mbox',
    'emlx',
    'dbx',
  ];

  const extended = [
    'email',
    'emix',
    'mbx',
    'tbb',
    'wab',
    'contact',
    'group',
    'p7m',
    'p7s',
    'smime',
    'winmail.dat',
    'tnef',
    'vcs',
    'vcard',
    'ldif',
    'nws',
    'fol',
    'pmm',
    'pmr',
    'pmi',
    'mmf',
    'msf',
    'snm',
    'bms',
    'ims',
    'mbg',
    'arc',
    'pab',
    'oab',
    'nk2',
    'pip',
  ];

  return [...commons, ...(finalSettings.extended ? extended : [])]
    .filter((ext) => !finalSettings.exclude.includes(ext))
    .map((ext) => (finalSettings.dot ? `.${ext}` : ext));
}
