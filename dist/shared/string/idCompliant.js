import simplifySpecialChars from './simplifySpecialChars.js';
export default function idCompliant(str, settings) {
    settings = Object.assign({ exclude: [] }, (settings !== null && settings !== void 0 ? settings : {}));
    // spaces
    str = str.replace(/\s/gm, '-');
    // special characters
    str = simplifySpecialChars(str);
    // replace characters like /, etc...
    const dict = {
        '/': '-',
        '@': '',
        '.': '-',
        ',': '-',
        '\\': '-',
        '(': '-',
        ')': '-',
        '{': '-',
        '}': '-',
        '[': '-',
        ']': '-',
        '=': '-',
        '?': '-',
        '!': '-',
        '&': '-',
        '%': '-',
        '*': '-',
        '"': '-',
        "'": '-',
        '`': '-',
        '+': '-',
        '°': '-',
        $: '-',
        '<': '-',
        '>': '-',
        ':': '-',
        '#': '-',
    };
    settings.exclude.forEach((char) => {
        delete dict[char];
    });
    Object.keys(dict).forEach((char) => {
        str = str.split(char).join(dict[char]);
    });
    // first and last characters + multiple ---
    str = str.replace(/\.{2,999}/gm, '.');
    str = str.replace(/^-{1,999}/gm, '');
    str = str.replace(/-{1,999}$/gm, '');
    str = str.replace(/-{2,999}/gm, '-');
    str = str.replace(/[^a-zA-Z0-9]{1,999}$/, '');
    str = str.replace(/^[^a-zA-Z0-9]{1,999}/, '');
    // lowercase
    str = str.toLowerCase();
    return str;
}
//# sourceMappingURL=idCompliant.js.map