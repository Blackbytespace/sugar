/**
 * @name            commonExecutableFileExtensions
 * @namespace       shared.extension
 * @type            Function
 * @platform        node
 * @platform        js
 * @status          stable
 *
 * This function allows you to get an array of common text file extensions with or without the dot
 * Common formats includes: exe, msi, bat, cmd, com, scr, bin, run, app, deb, rpm, dmg, pkg, apk, ipa, jar, sh, py, pl, rb, php, js, vbs, ps1, cgi
 * Extended formats includes: gadget, jsr, wsf, pi, pif, scf, lnk, inf, reg, msc, cpl, drv, sys, ocx, dll, so, dylib, bundle, framework, action, workflow, command, tool, out, elf, bin32, bin64, x86, x64, arm, mips, sparc, ppc, prg, prc, xex, xbe, nro, nso, rpx, wbfs, cia, gb, gbc, gba, nds, nes, smc, sfc, n64, z64, v64
 *
 * @param       {TCommonFileExtensionsSettings}           [settings={}]         Settings to customize the function behavior
 * @return      {Array<String>}                           The array of extensions
 *
 * @setting     {boolean}         [dot=false]         If true, the dot will be added to the extension
 * @setting     {Array<String>}   [exclude=[]]        An array of extensions to exclude
 * @setting     {boolean}         [extended=false]    If true, the extended formats will be included *
 *
 * @snippet         __commonExecutableFileExtensions()
 *
 * @example         js
 * import { __commonExecutableFileExtensions } from '@blackbyte/sugar/extension';
 * const extensions = __commonExecutableFileExtensions();
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __commonExecutableFileExtensions(settings = {}) {
    const finalSettings = Object.assign({ dot: false, exclude: [], extended: false }, settings);
    const commons = [
        'exe',
        'msi',
        'bat',
        'cmd',
        'com',
        'scr',
        'bin',
        'run',
        'app',
        'deb',
        'rpm',
        'dmg',
        'pkg',
        'apk',
        'ipa',
        'jar',
        'sh',
        'py',
        'pl',
        'rb',
        'php',
        'js',
        'vbs',
        'ps1',
        'cgi',
    ];
    const extended = [
        'gadget',
        'jsr',
        'wsf',
        'pi',
        'pif',
        'scf',
        'lnk',
        'inf',
        'reg',
        'msc',
        'cpl',
        'drv',
        'sys',
        'ocx',
        'dll',
        'so',
        'dylib',
        'bundle',
        'framework',
        'action',
        'workflow',
        'command',
        'tool',
        'out',
        'elf',
        'bin32',
        'bin64',
        'x86',
        'x64',
        'arm',
        'mips',
        'sparc',
        'ppc',
        'prg',
        'prc',
        'xex',
        'xbe',
        'nro',
        'nso',
        'rpx',
        'wbfs',
        'cia',
        'gb',
        'gbc',
        'gba',
        'nds',
        'nes',
        'smc',
        'sfc',
        'n64',
        'z64',
        'v64',
    ];
    return [...commons, ...(finalSettings.extended ? extended : [])]
        .filter((ext) => !finalSettings.exclude.includes(ext))
        .map((ext) => (finalSettings.dot ? `.${ext}` : ext));
}
//# sourceMappingURL=commonExecutableFileExtensions.js.map