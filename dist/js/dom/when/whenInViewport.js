import uniqid from '../../string/uniqid.js';
const whenInViewportStatuses = new WeakMap();
class CancelablePromise extends Promise {
    cancel() { }
}
export default function whenInViewport($elm, settings) {
    const finalSettings = Object.assign({ offset: '10px', once: true, whenIn: undefined, whenOut: undefined }, (settings !== null && settings !== void 0 ? settings : {}));
    let observer;
    function getRootMargin() {
        return [
            `${Math.round(window.innerHeight * 0.15 * -1)}px`,
            `${Math.round(window.innerWidth * 0.15 * -1)}px`,
            `${Math.round(window.innerHeight * 0.15 * -1)}px`,
            `${Math.round(window.innerWidth * 0.15 * -1)}px`,
        ].join(' ');
    }
    // generate a uniqid for this listener
    const id = uniqid();
    const rootMargin = finalSettings.offset
        ? `${finalSettings.offset}`
        : getRootMargin();
    const pro = new CancelablePromise((resolve) => {
        var _a;
        const options = {
            root: null, // relative to document viewport
            rootMargin,
            threshold: 0, // visible amount of item shown in relation to root
        };
        // store status for all listeners
        let statuses = (_a = whenInViewportStatuses.get($elm)) !== null && _a !== void 0 ? _a : {};
        whenInViewportStatuses.set($elm, statuses);
        function onChange(changes) {
            changes.forEach((change) => {
                var _a, _b;
                if (change.intersectionRatio === 0) {
                    // prevent from triggering multiple times the callback
                    // for this listener if already invisible
                    if (!statuses[id]) {
                        return;
                    }
                    // set the listener status on the element
                    statuses[id] = false;
                    // process callbacks
                    (_a = finalSettings.whenOut) === null || _a === void 0 ? void 0 : _a.call(finalSettings, $elm);
                }
                else {
                    // "once" finalSettings support
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
                    (_b = finalSettings.whenIn) === null || _b === void 0 ? void 0 : _b.call(finalSettings, $elm);
                    // resolve the promise only if the "once"
                    // setting is true
                    if (finalSettings.once) {
                        resolve($elm);
                    }
                }
            });
        }
        observer = new IntersectionObserver(onChange, options);
        observer.observe($elm);
        setTimeout(() => {
            pro.cancel = () => {
                observer.disconnect();
                Promise.resolve($elm);
            };
        });
    });
    pro.finally(() => {
        observer === null || observer === void 0 ? void 0 : observer.disconnect();
    });
    return pro;
}
//# sourceMappingURL=whenInViewport.js.map