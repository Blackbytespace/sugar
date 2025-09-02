var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import isInViewport from '../../is/isInViewport.js';
export default function whenEntersViewport(elm, settings) {
    function getRootMargin() {
        return [
            `${Math.round(window.innerHeight * 0.15 * -1)}px`,
            `${Math.round(window.innerWidth * 0.15 * -1)}px`,
            `${Math.round(window.innerHeight * 0.15 * -1)}px`,
            `${Math.round(window.innerWidth * 0.15 * -1)}px`,
        ].join(' ');
    }
    const finalSettings = Object.assign({ offset: undefined }, settings);
    let resizeTimeout;
    const rootMargin = finalSettings.offset
        ? `${finalSettings.offset}`
        : getRootMargin();
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        const options = {
            root: null, // relative to document viewport
            rootMargin, // margin around root. Values are similar to css property. Unitless values not allowed
            threshold: 0, // visible amount of item shown in relation to root
        };
        if (isInViewport(elm)) {
            return resolve(elm);
        }
        function onChange(changes, observer) {
            changes.forEach((change) => {
                var _a;
                if (change.intersectionRatio > 0) {
                    (_a = observer.disconnect) === null || _a === void 0 ? void 0 : _a.call(observer);
                    resolve(elm);
                }
            });
        }
        let observer = new IntersectionObserver(onChange, options);
        observer.observe(elm);
        window.addEventListener('resize', (e) => {
            clearTimeout(resizeTimeout);
            // @ts-ignore
            resizeTimeout = setTimeout(() => {
                var _a;
                (_a = observer.disconnect) === null || _a === void 0 ? void 0 : _a.call(observer);
                options.rootMargin = rootMargin;
                observer = new IntersectionObserver(onChange, options);
                observer.observe(elm);
            }, 500);
        });
    }));
}
//# sourceMappingURL=whenEntersViewport.js.map