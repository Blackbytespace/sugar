export default function simplify(string, settings = {}) {
    settings = Object.assign({ specialChars: true, lowerCase: true, dashSpace: true, trim: true }, settings);
    if (string == null)
        return '';
    const map = {
        A: 'À|Á|Ã|Â|Ä',
        a: 'á|à|ã|â|ä',
        E: 'É|È|Ê|Ë',
        e: 'é|è|ê|ë',
        I: 'Í|Ì|Î|Ï',
        i: 'í|ì|î|ï',
        O: 'Ó|Ò|Ô|Õ|Ö',
        o: 'ó|ò|ô|õ|ö',
        U: 'Ú|Ù|Û|Ü|Ü',
        u: 'ú|ù|û|ü|ü',
        C: 'Ç',
        c: 'ç',
        N: 'Ñ',
        n: 'ñ',
    };
    if (settings.dashSpace) {
        map[' '] = '_|-';
    }
    if (settings.lowerCase) {
        string = string.toLowerCase();
    }
    if (settings.specialChars) {
        for (const pattern in map) {
            string = string.replace(new RegExp(map[pattern], 'g'), pattern);
        }
    }
    if (settings.trim)
        string = string.trim();
    return string;
}
//# sourceMappingURL=simplify.js.map