import { isInViewport } from '@blackbyte/sugar/is';
import { distanceFromElementTopToViewportTop, whenRemoved, } from '@blackbyte/sugar/dom';
const _viewportEventsInited = new WeakMap();
export default function viewportEvents($elm, settings) {
    let observer, status = 'out';
    if (_viewportEventsInited.has($elm)) {
        return {
            $elm,
            cancel: () => { },
        };
    }
    _viewportEventsInited.set($elm, true);
    const finalSettings = Object.assign({ offset: 25, once: false }, (settings !== null && settings !== void 0 ? settings : {}));
    // check if the element is already in the viewport
    // when the user has changed tab and come back
    function visibilitychangeHandler() {
        if (document.visibilityState === 'visible' && isInViewport($elm)) {
            onIn();
        }
        else {
            onOut();
        }
    }
    document.addEventListener('visibilitychange', visibilitychangeHandler);
    // function to stop observing the element and remove the event listener
    function cancel() {
        observer === null || observer === void 0 ? void 0 : observer.disconnect();
        document.removeEventListener('visibilitychange', visibilitychangeHandler);
    }
    // when the element
    function onIn() {
        if (status === 'in') {
            return;
        }
        const distanceToTop = distanceFromElementTopToViewportTop($elm);
        if (distanceToTop < window.innerHeight * 0.5) {
            $elm.dispatchEvent(new CustomEvent('viewport.enter.above', {
                bubbles: true,
            }));
        }
        else {
            $elm.dispatchEvent(new CustomEvent('viewport.enter.below', {
                bubbles: true,
            }));
        }
        status = 'in';
        $elm.dispatchEvent(new CustomEvent('viewport.enter', {
            bubbles: true,
        }));
        $elm.dispatchEvent(new CustomEvent('viewport.in', {
            bubbles: true,
        }));
        if (finalSettings === null || finalSettings === void 0 ? void 0 : finalSettings.once) {
            observer.disconnect();
        }
    }
    function onOut() {
        if (status === 'out') {
            return;
        }
        const distanceToTop = distanceFromElementTopToViewportTop($elm);
        if (distanceToTop < window.innerHeight * 0.5) {
            $elm.dispatchEvent(new CustomEvent('viewport.leave.above', {
                bubbles: true,
            }));
        }
        else {
            $elm.dispatchEvent(new CustomEvent('viewport.leave.below', {
                bubbles: true,
            }));
        }
        status = 'out';
        $elm.dispatchEvent(new CustomEvent('viewport.leave', {
            bubbles: true,
        }));
        $elm.dispatchEvent(new CustomEvent('viewport.out', {
            bubbles: true,
        }));
    }
    observer = new IntersectionObserver((entries) => {
        if (!entries.length)
            return;
        const entry = entries.pop();
        if (!entry)
            return;
        // if the element is intersecting the viewport, we consider it as "in"
        if (entry.intersectionRatio > 0) {
            onIn();
            // if the element is not intersecting the viewport, we consider it as "out"
        }
        else {
            onOut();
        }
    }, {
        root: null, // viewport
        rootMargin: typeof finalSettings.offset === 'string'
            ? finalSettings.offset
            : `${finalSettings.offset}px`,
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    });
    observer.observe($elm);
    // clean up on remove
    whenRemoved($elm).then(() => {
        cancel();
    });
    return {
        $elm,
        cancel,
    };
}
//# sourceMappingURL=viewportEvents.js.map