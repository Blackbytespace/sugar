import __stripCssComments from 'strip-css-comments';
export default function stripCssComments(css, settings) {
    const finalSettings = Object.assign({ block: true, line: true }, (settings !== null && settings !== void 0 ? settings : {}));
    if (finalSettings.block) {
        // css = css.replace(/\/\*{2}([\s\S]+?)\*\//g, '');
        css = __stripCssComments(css, {
            preserve: false,
        });
    }
    if (finalSettings.line) {
        css = css.replace(/^[\s]{0,99999999}\/\/.*$/gm, '');
    }
    return css;
}
//# sourceMappingURL=stripCssComments.js.map