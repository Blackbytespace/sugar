import stripAnsi from 'strip-ansi';
export default function countLineChars(line, count = {}) {
    count = Object.assign({ htmlTags: false, terminalSpecialChars: false, newLineChars: false }, count);
    let newLine = line;
    if (count.terminalSpecialChars === false) {
        newLine = stripAnsi(newLine);
    }
    if (count.htmlTags === false) {
        newLine = newLine.replace(/<\/?[a-zA-Z0-9]+\s?\/?>/g, '');
    }
    if (count.newLineChars === false) {
        newLine = newLine.replace('\n', '');
    }
    return newLine.length;
}
//# sourceMappingURL=countLineChars.js.map