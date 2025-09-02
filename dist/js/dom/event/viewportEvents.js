const _viewportEventsInited = new WeakMap();
export default function viewportEvents($elm, settings) {
    let observer, status = 'out';
    if (_viewportEventsInited.has($elm)) {
        return $elm;
    }
    _viewportEventsInited.set($elm, true);
    const finalSettings = Object.assign({ offset: 25, once: false }, (settings !== null && settings !== void 0 ? settings : {}));
    observer = new IntersectionObserver((entries, observer) => {
        if (!entries.length)
            return;
        const entry = entries.pop();
        if (!entry)
            return;
        if (entry.intersectionRatio > 0) {
            if (status === 'in') {
                return;
            }
            status = 'in';
            $elm.dispatchEvent(new CustomEvent('viewport.in', {
                bubbles: true,
            }));
            if (finalSettings === null || finalSettings === void 0 ? void 0 : finalSettings.once) {
                observer.disconnect();
            }
        }
        else {
            if (status === 'out') {
                return;
            }
            status = 'out';
            $elm.dispatchEvent(new CustomEvent('viewport.out', {
                bubbles: true,
            }));
        }
    }, {
        root: null, // viewport
        rootMargin: typeof finalSettings.offset === 'string'
            ? finalSettings.offset
            : `${finalSettings.offset}px`,
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    });
    observer.observe($elm);
    return $elm;
}
//# sourceMappingURL=viewportEvents.js.map