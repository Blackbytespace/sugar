function replaceTokens(string, tokensObj, settings = {}) {
    var _a;
    settings = Object.assign({ regexp: '\\[([a-zA-Z0-9-_]+)\\]', stripUndefined: true }, settings);
    let tokens;
    const reg = new RegExp((_a = settings.regexp) !== null && _a !== void 0 ? _a : '\\[([a-zA-Z0-9-_]+)\\]', 'g');
    while ((tokens = reg.exec(string))) {
        if (tokensObj[tokens[1]] === undefined && !settings.stripUndefined)
            return '';
        string = string.replace(tokens[0], tokensObj[tokens[1]] || '');
    }
    if (settings.stripUndefined) {
        string = string.replace(reg, '');
    }
    return string;
}
export default replaceTokens;
//# sourceMappingURL=replaceTokens.js.map