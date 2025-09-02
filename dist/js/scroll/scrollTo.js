var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-nocheck
import easeInOutQuad from '../../shared/easing/easeInOutQuad.js';
import isUserScrolling from '../is/isUserScrolling.js';
export default function __scrollTo(target, settings = {}) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        const finalSettings = Object.assign({ $elm: window, duration: 500, easing: easeInOutQuad, offsetX: 0, offsetY: 0, align: 'start', justify: 'start', force: false }, settings);
        // remap element if needed
        if (finalSettings.$elm === document.body)
            finalSettings.$elm = window;
        if (finalSettings.$elm === document)
            finalSettings.$elm = window;
        if (finalSettings.$elm === document.querySelector('html'))
            finalSettings.$elm = window;
        const $scrollElm = finalSettings.$elm === window ? document.body : finalSettings.$elm;
        let elmHeight = finalSettings.$elm === window
            ? window.innerHeight
            : finalSettings.$elm.offsetHeight;
        let elmWidth = finalSettings.$elm === window
            ? window.innerWidth
            : finalSettings.$elm.offsetWidth;
        let elmTop = finalSettings.$elm === window
            ? 0
            : (_a = finalSettings.$elm) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().top;
        let elmLeft = finalSettings.$elm === window
            ? 0
            : (_b = finalSettings.$elm) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect().left;
        let maxScrollY = $scrollElm.scrollHeight - elmHeight;
        let maxScrollX = $scrollElm.scrollWidth - elmWidth;
        const currentY = finalSettings.$elm === window
            ? window.pageYOffset
            : (_c = finalSettings.$elm) === null || _c === void 0 ? void 0 : _c.scrollTop;
        const currentX = finalSettings.$elm === window
            ? window.pageXOffset
            : (_d = finalSettings.$elm) === null || _d === void 0 ? void 0 : _d.scrollLeft;
        // handle paddings
        if (finalSettings.$elm !== window) {
            const computedScrollStyles = window.getComputedStyle(finalSettings.$elm);
            maxScrollY += parseInt(computedScrollStyles.paddingTop);
            maxScrollY += parseInt(computedScrollStyles.paddingBottom);
            maxScrollX += parseInt(computedScrollStyles.paddingLeft);
            maxScrollX += parseInt(computedScrollStyles.paddingRight);
        }
        let targetY = currentY, targetX = currentX;
        let targetBounds;
        try {
            if (window.getComputedStyle(target).display === 'none') {
                target.style.display = 'block';
            }
            targetBounds = target.getBoundingClientRect();
            target.style.display = null;
        }
        catch (e) {
            targetBounds = {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            };
        }
        const offsetY = (_e = finalSettings.offsetY) !== null && _e !== void 0 ? _e : 0;
        const offsetX = (_f = finalSettings.offsetX) !== null && _f !== void 0 ? _f : 0;
        if (target === 'top') {
            targetY = 0;
        }
        else if (target === 'bottom') {
            targetY =
                (_h = (_g = finalSettings.$elm) === null || _g === void 0 ? void 0 : _g.scrollHeight) !== null && _h !== void 0 ? _h : document.documentElement.scrollHeight;
        }
        if (target === 'left') {
            targetX = 0;
        }
        else if (target === 'right') {
            targetY =
                (_k = (_j = finalSettings.$elm) === null || _j === void 0 ? void 0 : _j.scrollWidth) !== null && _k !== void 0 ? _k : document.documentElement.scrollWidth;
        }
        // y
        if (finalSettings.align === 'center') {
            targetY += targetBounds.top + targetBounds.height / 2;
            targetY -= elmHeight / 2;
            targetY -= offsetY;
        }
        else if (finalSettings.align === 'end') {
            targetY += targetBounds.bottom;
            targetY -= elmHeight;
            targetY += offsetY;
        }
        else {
            // start, undefined
            targetY += targetBounds.top;
            targetY -= offsetY;
        }
        targetY = Math.max(Math.min(maxScrollY, targetY), 0);
        const deltaY = targetY - currentY - elmTop;
        // x
        if (finalSettings.justify === 'center') {
            targetX += targetBounds.left + targetBounds.width / 2;
            targetX -= elmWidth / 2;
            targetX -= offsetX;
        }
        else if (finalSettings.justify === 'end') {
            targetX += targetBounds.right;
            targetX -= elmWidth;
            targetX += offsetX;
        }
        else {
            // start, undefined
            targetX += targetBounds.left;
            targetX -= offsetX;
        }
        targetX = Math.max(Math.min(maxScrollX, targetX), 0);
        const deltaX = targetX - currentX - elmLeft;
        // element position
        if ((_l = finalSettings.$elm) === null || _l === void 0 ? void 0 : _l.getBoundingClientRect) {
            const elmBounds = finalSettings.$elm.getBoundingClientRect();
            targetY -= elmBounds.top;
            targetX -= elmBounds.left;
        }
        const obj = {
            targetY,
            targetX,
            deltaY,
            deltaX,
            currentY,
            currentX,
            duration: finalSettings.duration,
            easing: finalSettings.easing,
            force: finalSettings.force,
            $elm: finalSettings.$elm,
            onFinish() {
                finalSettings.onFinish && finalSettings.onFinish();
                resolve();
            },
            startTime: Date.now(),
            step: __scrollTo.step,
        };
    }));
}
__scrollTo.step = function () {
    // Calculate how much time has passed
    const t = Math.min((Date.now() - this.startTime) / this.duration, 1);
    let $scrollElm = this.$elm;
    if (this.$elm === document.body || this.$elm === document) {
        $scrollElm = window;
    }
    // Scroll window amount determined by easing
    const x = this.targetX - (1 - this.easing(t)) * this.deltaX;
    const y = this.targetY - (1 - this.easing(t)) * this.deltaY;
    $scrollElm.scrollTo(x, y);
    if (!this.force && isUserScrolling(this.$elm))
        return;
    // Continue animation as long as duration hasn't surpassed
    if (t !== 1) {
    }
    else {
        if (this.onFinish)
            this.onFinish();
    }
};
//# sourceMappingURL=scrollTo.js.map