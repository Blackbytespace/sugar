export default function parseAuthorString(string) {
    var _a, _b, _c, _d, _e, _f;
    const reg = /(.*)\s?<(.*)>\s?\((.*)\)/gm;
    const matches = reg.exec(string.trim());
    const authorObj = {
        name: (_b = (_a = matches === null || matches === void 0 ? void 0 : matches[1]) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : '',
        email: (_d = (_c = matches === null || matches === void 0 ? void 0 : matches[2]) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : '',
        url: (_f = (_e = matches === null || matches === void 0 ? void 0 : matches[3]) === null || _e === void 0 ? void 0 : _e.trim()) !== null && _f !== void 0 ? _f : '',
    };
    return authorObj;
}
//# sourceMappingURL=parseAuthorString.js.map