var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __parse from '../../../shared/string/parse.js';
export default function whenAttribute($elm, attrName, settings) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const finalSettings = Object.assign({ check: undefined }, (settings !== null && settings !== void 0 ? settings : {}));
        if ($elm.hasAttribute(attrName)) {
            const value = __parse((_a = $elm.getAttribute(attrName)) !== null && _a !== void 0 ? _a : 'undefined');
            if (finalSettings.check && finalSettings.check(value, value)) {
                resolve(value);
                return;
            }
            else if (!finalSettings.check) {
                resolve(value);
                return;
            }
        }
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                var _a;
                if (mutation.attributeName !== attrName) {
                    return;
                }
                const value = __parse((_a = $elm.getAttribute(mutation.attributeName)) !== null && _a !== void 0 ? _a : 'undefined');
                if (finalSettings.check &&
                    finalSettings.check(value, mutation.oldValue)) {
                    resolve(value);
                    observer.disconnect();
                }
                else if (!finalSettings.check) {
                    resolve(value);
                    observer.disconnect();
                }
            });
        });
        observer.observe($elm, {
            attributes: true,
        });
    }));
}
//# sourceMappingURL=whenAttribute.js.map