// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import whenAnimationEnd from '../when/whenAnimationEnd.js';
import whenEntersViewport from '../when/whenEntersViewport.js';
import whenInteract from '../when/whenInteract.js';
import whenInViewport from '../when/whenInViewport.js';
import whenNearViewport from '../when/whenNearViewport.js';
import whenOutOfViewport from '../when/whenOutOfViewport.js';
import whenStylesheetsReady from '../when/whenStylesheetsReady.js';
import whenVisible from '../when/whenVisible.js';
export const WhenTriggers = [
    'direct',
    'directly',
    'inViewport',
    'nearViewport',
    'enterViewport',
    'outOfViewport',
    'interact',
    'visible',
    'stylesheetsReady',
    'domReady',
    'animationEnd',
];
export default function when($elm, trigger, settings) {
    const finalSettings = Object.assign({ whenInViewport: {}, whenNearViewport: {}, whenOutOfViewport: {}, whenInteract: {}, whenVisible: {}, whenStylesheetsReady: {} }, (settings !== null && settings !== void 0 ? settings : {}));
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        // ensure we work with an array of time(s)
        if (!Array.isArray(trigger))
            trigger = trigger.split(',').map((t) => t.trim());
        const promises = [];
        // adding watchers
        trigger.forEach((t) => {
            // timeout
            const timeoutMatches = t.match(/^timeout\:([0-9]+)/);
            if (timeoutMatches && timeoutMatches[1]) {
                const timeout = parseInt(timeoutMatches[1]);
                const promise = new Promise((resolve) => {
                    setTimeout(resolve, timeout);
                });
                promises.push(promise);
                return;
            }
            switch (t) {
                case 'inViewport':
                    promises.push(whenInViewport($elm, finalSettings.whenInViewport));
                    break;
                case 'nearViewport':
                    promises.push(whenNearViewport($elm, finalSettings.whenNearViewport));
                    break;
                case 'entersViewport':
                    promises.push(whenEntersViewport($elm, finalSettings.whenEntersViewport));
                    break;
                case 'outOfViewport':
                    promises.push(whenOutOfViewport($elm, finalSettings.whenOutOfViewport));
                    break;
                case 'interact':
                    promises.push(whenInteract($elm, finalSettings.whenInteract));
                    break;
                case 'visible':
                    promises.push(whenVisible($elm, {
                        whenVisible: finalSettings.whenVisible,
                        once: true,
                    }));
                    break;
                case 'domReady':
                    promises.push(whenDomReady());
                    break;
                case 'stylesheetsReady':
                    promises.push(whenStylesheetsReady($elm ? [$elm] : null));
                    break;
                case 'animationEnd':
                    promises.push(whenAnimationEnd($elm));
                    break;
            }
        });
        // if no times setted, execute directly
        if (!trigger.length ||
            trigger.includes('direct') ||
            trigger.includes('directly')) {
            resolve($elm);
            return;
        }
        // listen for at least 1 promise resolved
        yield Promise.race(promises);
        resolve($elm);
    }));
}
//# sourceMappingURL=when.js.map