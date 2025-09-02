import uniqid from '../../string/uniqid.js';
const _whenVisibleStatuses = new WeakMap();
export default function whenVisible($elm, settings) {
    let observer;
    const pro = new Promise((resolve, reject) => {
        var _a;
        const finalSettings = Object.assign({ whenVisible: undefined, whenInvisible: undefined, once: true }, (settings !== null && settings !== void 0 ? settings : {}));
        const statuses = (_a = _whenVisibleStatuses.get($elm)) !== null && _a !== void 0 ? _a : {};
        _whenVisibleStatuses.set($elm, statuses);
        // generate a uniqid for this listener
        const id = uniqid();
        observer = new IntersectionObserver(function (entries) {
            var _a, _b;
            if (entries[0]['intersectionRatio'] == 0) {
                // prevent from triggering multiple times the callback
                // for this listener if already invisible
                if (!statuses[id]) {
                    return;
                }
                // set the listener status on the element
                statuses[id] = false;
                // process callbacks
                (_a = finalSettings.whenInvisible) === null || _a === void 0 ? void 0 : _a.call(finalSettings, $elm);
            }
            else {
                // "once" settings support
                if (finalSettings.once) {
                    observer.disconnect();
                }
                // prevent from triggering multiple times the callback
                // for this listener if already visible
                if (statuses[id]) {
                    return;
                }
                // set the listener status on the element
                statuses[id] = true;
                // process callbacks
                (_b = finalSettings.whenVisible) === null || _b === void 0 ? void 0 : _b.call(finalSettings, $elm);
                // resolve the promise only if the "once"
                // setting is true
                if (finalSettings.once) {
                    resolve($elm);
                }
            }
        });
        observer.observe($elm);
    });
    pro.finally(() => {
        observer === null || observer === void 0 ? void 0 : observer.disconnect();
    });
    return pro;
}
//# sourceMappingURL=whenVisible.js.map