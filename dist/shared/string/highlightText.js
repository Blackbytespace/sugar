import Mark from 'mark.js';
export default function highlightText(ctx, search, settings) {
    const finalSettings = Object.assign({ class: '-highlight' }, (settings !== null && settings !== void 0 ? settings : {}));
    let resType, internalCtx;
    if (typeof ctx === 'string') {
        internalCtx = document.createElement('div');
        internalCtx.innerHTML = ctx;
        resType = 'string';
    }
    else if (ctx instanceof HTMLElement) {
        internalCtx = ctx;
        resType = 'element';
    }
    const mark = new Mark(internalCtx), markOptions = {
        className: finalSettings.class,
    };
    if (search instanceof RegExp) {
        mark.markRegExp(search, markOptions);
    }
    else if (Array.isArray(search) || typeof search === 'string') {
        mark.mark(search, markOptions);
    }
    if (resType === 'string') {
        return internalCtx.innerHTML;
    }
    return internalCtx;
}
//# sourceMappingURL=highlightText.js.map