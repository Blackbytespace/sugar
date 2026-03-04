var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { when } from '@blackbyte/sugar/dom';
export default function querySelectorLive(selector, cb, settings) {
    var _a;
    // ─── State ────────────────────────────────────────────────────────────────
    let canceled = false;
    // Tracks nodes already dispatched (for once:true)
    const seen = new WeakSet();
    // Nodes currently awaiting a `when` promise
    const pending = new WeakSet();
    // ─── Settings ─────────────────────────────────────────────────────────────
    const finalSettings = Object.assign({ rootNode: document, once: true, afterFirst: undefined, firstOnly: false, attributes: [], when: undefined, disconnectedCallback: undefined }, (settings !== null && settings !== void 0 ? settings : {}));
    // ─── API ──────────────────────────────────────────────────────────────────
    const api = { cancel };
    function cancel() {
        canceled = true;
        observer.disconnect();
    }
    // ─── Attribute list for the MutationObserver ──────────────────────────────
    // Always watch class and id (mutations on those can make selectors match).
    // Also auto-detect attribute names from bracketed parts of the selector, and
    // merge with any caller-supplied list.
    const attrSet = new Set(['class', 'id', ...finalSettings.attributes]);
    for (const match of selector.matchAll(/\[([^\]=~|^$*]+)/g)) {
        attrSet.add(match[1].trim());
    }
    const attributeFilter = Array.from(attrSet);
    // ─── disconnectedCallback watcher ────────────────────────────────────────
    function watchDisconnect($elm) {
        if (!finalSettings.disconnectedCallback || !$elm.parentNode)
            return;
        const parentObserver = new MutationObserver(() => {
            if (!document.contains($elm)) {
                parentObserver.disconnect();
                finalSettings.disconnectedCallback($elm);
            }
        });
        parentObserver.observe($elm.parentNode, { childList: true });
    }
    // ─── Core: handle one matching element ───────────────────────────────────
    function handleElement($elm) {
        return __awaiter(this, void 0, void 0, function* () {
            if (canceled)
                return;
            // once:true — skip if we already fired for this node
            if (finalSettings.once && seen.has($elm))
                return;
            // Avoid double-processing while a `when` promise is in flight
            if (pending.has($elm))
                return;
            if (finalSettings.when) {
                pending.add($elm);
                try {
                    yield when($elm, [finalSettings.when]);
                }
                finally {
                    pending.delete($elm);
                }
                // Re-check after the async gap
                if (canceled)
                    return;
                if (finalSettings.once && seen.has($elm))
                    return;
            }
            if (finalSettings.once)
                seen.add($elm);
            cb($elm, api);
            watchDisconnect($elm);
            if (finalSettings.firstOnly)
                cancel();
        });
    }
    // ─── Walk a subtree looking for matching nodes ────────────────────────────
    function scan(root) {
        if (canceled)
            return;
        // Check the root itself if it is an Element
        if (root instanceof HTMLElement && root.matches(selector)) {
            handleElement(root);
        }
        // Check descendants
        if ('querySelectorAll' in root) {
            root
                .querySelectorAll(selector)
                .forEach(($elm) => handleElement($elm));
        }
    }
    // ─── MutationObserver ─────────────────────────────────────────────────────
    const observerInit = {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter,
    };
    const observer = new MutationObserver((mutations) => {
        if (canceled)
            return;
        for (const mutation of mutations) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => scan(node));
            }
            else if (mutation.type === 'attributes') {
                const target = mutation.target;
                if (target instanceof HTMLElement && target.matches(selector)) {
                    handleElement(target);
                }
            }
        }
    });
    observer.observe(finalSettings.rootNode, observerInit);
    // ─── Initial scan of the current DOM ─────────────────────────────────────
    scan(finalSettings.rootNode);
    // afterFirst fires synchronously after the initial scan is queued
    (_a = finalSettings.afterFirst) === null || _a === void 0 ? void 0 : _a.call(finalSettings);
    return api;
}
//# sourceMappingURL=querySelectorLive.js.map