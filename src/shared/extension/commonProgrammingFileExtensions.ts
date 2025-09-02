import { type TCommonFileExtensionsSettings } from './commonFileExtensions.js';

/**
 * @name            commonProgrammingFileExtensions
 * @namespace       shared.extension
 * @type            Function
 * @platform        node
 * @platform        js
 * @status          stable
 *
 * This function allows you to get an array of common text file extensions with or without the dot
 * Common formats includes: js, ts, jsx, tsx, py, java, c, cpp, cs, php, rb, go, rs, swift, kt, dart, html, css, scss, sass, less, json, xml, sql, sh, bat, ps1, r, scala, clj, h, hpp, asp, jsp, cfm, pl, vb, class
 * Extended formats includes: asm, awk, bas, boa, boo, cbl, cob, coffee, cr, d, diff, e, erl, ex, exs, f, f77, f90, f95, for, forth, fs, fsx, groovy, hs, iml, inc, io, jl, lisp, lsp, lua, m, ml, mli, nim, p, pas, patch, pike, pro, prolog, pyx, rkt, sc, scm, smalltalk, sml, st, tcl, v, vhd, vhdl, vim, ws, xsl, xslt, yacc, zig.
 *
 * @param       {TCommonFileExtensionsSettings}           [settings={}]         Settings to customize the function behavior
 * @return      {Array<String>}                           The array of extensions
 *
 * @setting     {boolean}         [dot=false]         If true, the dot will be added to the extension
 * @setting     {Array<String>}   [exclude=[]]        An array of extensions to exclude
 * @setting     {boolean}         [extended=false]    If true, the extended formats will be included *
 *
 * @snippet         __commonProgrammingFileExtensions()
 *
 * @example         js
 * import { __commonProgrammingFileExtensions } from '@blackbyte/sugar/extension';
 * const extensions = __commonProgrammingFileExtensions();
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __commonProgrammingFileExtensions(
  settings: Partial<TCommonFileExtensionsSettings> = {},
): string[] {
  const finalSettings: TCommonFileExtensionsSettings = {
    dot: false,
    exclude: [],
    ...settings,
  };

  const commons = [
    'js',
    'ts',
    'jsx',
    'tsx',
    'py',
    'java',
    'c',
    'cpp',
    'cs',
    'php',
    'rb',
    'go',
    'rs',
    'swift',
    'kt',
    'dart',
    'html',
    'css',
    'scss',
    'sass',
    'less',
    'json',
    'xml',
    'sql',
    'sh',
    'bat',
    'ps1',
    'r',
    'scala',
    'clj',
    'h',
    'hpp',
    'asp',
    'jsp',
    'cfm',
    'pl',
    'vb',
    'class',
  ];

  const extended = [
    'asm',
    'awk',
    'bas',
    'boa',
    'boo',
    'cbl',
    'cob',
    'coffee',
    'cr',
    'd',
    'diff',
    'e',
    'erl',
    'ex',
    'exs',
    'f',
    'f77',
    'f90',
    'f95',
    'for',
    'forth',
    'fs',
    'fsx',
    'groovy',
    'hs',
    'iml',
    'inc',
    'io',
    'jl',
    'lisp',
    'lsp',
    'lua',
    'm',
    'ml',
    'mli',
    'nim',
    'p',
    'pas',
    'patch',
    'pike',
    'pro',
    'prolog',
    'pyx',
    'rkt',
    'sc',
    'scm',
    'smalltalk',
    'sml',
    'st',
    'tcl',
    'v',
    'vhd',
    'vhdl',
    'vim',
    'ws',
    'xsl',
    'xslt',
    'yacc',
    'zig',
  ];

  return [...commons, ...(finalSettings.extended ? extended : [])]
    .filter((ext) => !finalSettings.exclude.includes(ext))
    .map((ext) => (finalSettings.dot ? `.${ext}` : ext));
}
