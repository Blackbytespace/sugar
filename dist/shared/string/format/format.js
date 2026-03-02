function format(string, format) {
    var _a;
    let schema = [];
    switch (format) {
        case 'isoDate':
            schema = [
                '\\d',
                '\\d',
                '\\d',
                '\\d',
                '-',
                '\\d',
                '\\d',
                '-',
                '\\d',
                '\\d',
            ];
            break;
        case 'isoDateTime':
            schema = [
                '\\d',
                '\\d',
                '\\d',
                '\\d',
                '-',
                '\\d',
                '\\d',
                '-',
                '\\d',
                '\\d',
                ' ',
                '\\d',
                '\\d',
                ':',
                '\\d',
                '\\d',
                ':',
                '\\d',
                '\\d',
            ];
            break;
        case 'isoTime':
            schema = ['\\d', '\\d', ':', '\\d', '\\d', ':', '\\d', '\\d'];
            break;
        case 'hex':
            schema = ['#', '\\w', '\\w', '\\w', '\\w', '\\w', '\\w'];
            break;
        case 'hexa':
            schema = ['#', '\\w', '\\w', '\\w', '\\w', '\\w', '\\w', '\\w', '\\w'];
            break;
        case 'integer':
            return string.replace(/^[0-9]+$/i, '');
            break;
        case 'number':
            return string.replace(/^[0-9\.]+$/i, '');
            break;
        case 'alphanum':
            return string.replace(/^[a-z0-9]+$/i, '');
            break;
        case 'creditCard':
            schema = [
                '\\d',
                '\\d',
                '\\d',
                '\\d',
                ' ',
                '\\d',
                '\\d',
                '\\d',
                '\\d',
                ' ',
                '\\d',
                '\\d',
                '\\d',
                '\\d',
                ' ',
                '\\d',
                '\\d',
                '\\d',
                '\\d',
            ];
            break;
        default:
            return string;
            break;
    }
    let newValue = '';
    const loopOn = string.length > schema.length ? string : schema;
    let schemaCharI = 0;
    for (let i = 0; i < loopOn.length; i++) {
        const schemaChar = schema[schemaCharI], char = (_a = string[i]) !== null && _a !== void 0 ? _a : '';
        // end of characters
        if (!schemaChar || !char || i >= string.length) {
            break;
        }
        if (schemaChar === char) {
            newValue += char;
            schemaCharI++;
        }
        else if (schemaChar.match(/^\\d/)) {
            if (char.match(/^\d$/)) {
                newValue += char;
                schemaCharI++;
            }
            else {
                // schemaCharI++;
            }
        }
        else if (schemaChar.match(/^\\w/)) {
            if (char.match(/^\w$/)) {
                newValue += char;
                schemaCharI++;
            }
            else {
                // schemaCharI++;
            }
        }
        else if (schemaChar !== char) {
            newValue += schemaChar;
            i--;
            schemaCharI++;
        }
        else {
        }
    }
    return newValue;
}
format.formats = [
    'isoDate',
    'isoDateTime',
    'isoTime',
    'integer',
    'number',
    'alphanum',
    'hex',
    'hexa',
    'creditCard',
];
export default format;
//# sourceMappingURL=format.js.map