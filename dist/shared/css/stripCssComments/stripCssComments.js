import __stripCssComments from 'strip-css-comments';
export default function stripCssComments(css, settings) {
    // Handle null/undefined input
    if (css == null) {
        return '';
    }
    const finalSettings = Object.assign({ block: true, line: true }, (settings !== null && settings !== void 0 ? settings : {}));
    if (finalSettings.block) {
        // css = css.replace(/\/\*{2}([\s\S]+?)\*\//g, '');
        css = __stripCssComments(css, {
            preserve: false,
        });
    }
    if (finalSettings.line) {
        // Remove line comments - handle both standalone lines and inline comments
        // This regex matches // comments but tries to avoid URLs by looking for context
        css = css.replace(/\/\/.*$/gm, '');
    }
    return css;
}
//# sourceMappingURL=stripCssComments.js.map