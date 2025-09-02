import unique from '../array/unique.js';
import commonProgrammingFileExtensions from './commonProgrammingFileExtensions.js';
/**
 * @name            commonTextFileExtensions
 * @namespace       shared.extension
 * @type            Function
 * @platform        node
 * @platform        js
 * @status          stable
 *
 * This function allows you to get an array of common text file extensions with or without the dot
 * Common formats includes: txt, htm, html, md, json, csv, rss, xhtml, xml, log, rtf, doc, docx, odt, pdf, tex, latex, readme, changelog, license, yaml, yml, ini, cfg, conf, properties
 * Extended formats includes: asc, asciidoc, adoc, rst, textile, wiki, mediawiki, creole, pod, texi, texinfo, info, man, nroff, troff, groff, me, ms, mm, sgml, sgm, dtd, ent, mod, xsd, rng, rnc, xsl, xslt, fo, dita, ditamap, ditaval, docbook, dbk, fb2, opf, ncx, epub, mobi, azw, azw3, kf8, pdb, lit, lrf, rb, tcr, pml, prc, imp, ebk, tr2, tr3, tomeraider
 *
 * @param       {TCommonFileExtensionsSettings}           [settings={}]         Settings to customize the function behavior
 * @return      {Array<String>}                           The array of extensions
 *
 * @setting     {boolean}         [dot=false]         If true, the dot will be added to the extension
 * @setting     {Array<String>}   [exclude=[]]        An array of extensions to exclude
 * @setting     {boolean}         [extended=false]    If true, the extended formats will be included *
 *
 * @snippet         __commonTextFileExtensions()
 *
 * @example         js
 * import { __commonTextFileExtensions } from '@blackbyte/sugar/extension';
 * const extensions = __commonTextFileExtensions();
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __commonTextFileExtensions(settings = {}) {
    const finalSettings = Object.assign({ dot: false, exclude: [], extended: false }, settings);
    const commons = [
        'txt',
        'htm',
        'html',
        'md',
        'json',
        'csv',
        'rss',
        'xhtml',
        'xml',
        'log',
        'rtf',
        'doc',
        'docx',
        'odt',
        'pdf',
        'tex',
        'latex',
        'readme',
        'changelog',
        'license',
        'yaml',
        'yml',
        'ini',
        'cfg',
        'conf',
        'properties',
    ];
    const extended = [
        'asc',
        'asciidoc',
        'adoc',
        'rst',
        'textile',
        'wiki',
        'mediawiki',
        'creole',
        'pod',
        'texi',
        'texinfo',
        'info',
        'man',
        'nroff',
        'troff',
        'groff',
        'me',
        'ms',
        'mm',
        'sgml',
        'sgm',
        'dtd',
        'ent',
        'mod',
        'xsd',
        'rng',
        'rnc',
        'xsl',
        'xslt',
        'fo',
        'dita',
        'ditamap',
        'ditaval',
        'docbook',
        'dbk',
        'fb2',
        'opf',
        'ncx',
        'epub',
        'mobi',
        'azw',
        'azw3',
        'kf8',
        'pdb',
        'lit',
        'lrf',
        'rb',
        'tcr',
        'pml',
        'prc',
        'imp',
        'ebk',
        'tr2',
        'tr3',
        'tomeraider',
    ];
    return unique([
        ...commons,
        ...(finalSettings.extended ? extended : []),
        ...commonProgrammingFileExtensions(finalSettings),
    ])
        .filter((ext) => !finalSettings.exclude.includes(ext))
        .map((ext) => (finalSettings.dot ? `.${ext}` : ext));
}
//# sourceMappingURL=commonTextFileExtensions.js.map