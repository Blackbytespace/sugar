/**
 * @name            commonWebFileExtensions
 * @namespace       shared.extension
 * @type            Function
 * @platform        node
 * @platform        js
 * @status          stable
 *
 * This function allows you to get an array of common text file extensions with or without the dot
 * Common formats includes: html, htm, css, js, php, asp, jsp, py, rb, pl, cgi, cfm, xml, json, rss, xhtml, ts, jsx, tsx, scss, sass, less, vue, svelte
 * Extended formats includes: aspx, ashx, asmx, axd, do, action, faces, xhtml, jspx, tag, tld, erb, rhtml, haml, slim, ejs, hbs, handlebars, mustache, twig, blade, smarty, ftl, vm, vsl, tpl, tmpl, phtml, php3, php4, php5, phps, pht, phar, shtml, shtm, stm, ihtml, mhtml, mht, wml, wap, csp, cer, part, webmanifest, appcache, webapp, map, coffee, dart, elm, cljs, elm
 *
 * @param       {TCommonFileExtensionsSettings}           [settings={}]         Settings to customize the function behavior
 * @return      {Array<String>}                           The array of extensions
 *
 * @setting     {boolean}         [dot=false]         If true, the dot will be added to the extension
 * @setting     {Array<String>}   [exclude=[]]        An array of extensions to exclude
 * @setting     {boolean}         [extended=false]    If true, the extended formats will be included *
 *
 * @snippet         __commonWebFileExtensions()
 *
 * @example         js
 * import { __commonWebFileExtensions } from '@blackbyte/sugar/extension';
 * const extensions = __commonWebFileExtensions();
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __commonWebFileExtensions(settings = {}) {
    const finalSettings = Object.assign({ dot: false, exclude: [], extended: false }, settings);
    const commons = [
        'html',
        'htm',
        'css',
        'js',
        'php',
        'asp',
        'jsp',
        'py',
        'rb',
        'pl',
        'cgi',
        'cfm',
        'xml',
        'json',
        'rss',
        'xhtml',
        'ts',
        'jsx',
        'tsx',
        'scss',
        'sass',
        'less',
        'vue',
        'svelte',
    ];
    const extended = [
        'aspx',
        'ashx',
        'asmx',
        'axd',
        'do',
        'action',
        'faces',
        'xhtml',
        'jspx',
        'tag',
        'tld',
        'erb',
        'rhtml',
        'haml',
        'slim',
        'ejs',
        'hbs',
        'handlebars',
        'mustache',
        'twig',
        'blade',
        'smarty',
        'ftl',
        'vm',
        'vsl',
        'tpl',
        'tmpl',
        'phtml',
        'php3',
        'php4',
        'php5',
        'phps',
        'pht',
        'phar',
        'shtml',
        'shtm',
        'stm',
        'ihtml',
        'mhtml',
        'mht',
        'wml',
        'wap',
        'csp',
        'cer',
        'part',
        'webmanifest',
        'appcache',
        'webapp',
        'map',
        'coffee',
        'dart',
        'elm',
        'cljs',
        'elm',
    ];
    return [...commons, ...(finalSettings.extended ? extended : [])]
        .filter((ext) => !finalSettings.exclude.includes(ext))
        .map((ext) => (finalSettings.dot ? `.${ext}` : ext));
}
//# sourceMappingURL=commonWebFileExtensions.js.map