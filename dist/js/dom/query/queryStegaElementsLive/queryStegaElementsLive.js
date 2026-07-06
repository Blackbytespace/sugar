var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { stega } from '@blackbyte/sugar/crypto';
import { when } from '@blackbyte/sugar/dom';
import { VERCEL_STEGA_REGEX, vercelStegaClean } from '@vercel/stega';
function extractStega(value) {
    const matches = value.match(VERCEL_STEGA_REGEX);
    return matches ? matches.join('') : null;
}
export default function queryStegaElementsLive(cb, settings) {
    // ─── State ────────────────────────────────────────────────────────────────
    let canceled = false;
    // Tracks already-dispatched elements, keyed by the DOM element itself. An
    // element is marked as seen the first time it is taken, regardless of whether
    // the stega data came from its text content or an attribute. A WeakSet lets
    // entries be garbage collected once the element is removed from the DOM.
    const seen = new WeakSet();
    function hasSeen($elm) {
        return seen.has($elm);
    }
    function markSeen($elm) {
        seen.add($elm);
    }
    // ─── Settings ─────────────────────────────────────────────────────────────
    const finalSettings = Object.assign({ rootNode: document, once: true, clean: true, attributes: true, when: undefined, disconnectedCallback: undefined }, (settings !== null && settings !== void 0 ? settings : {}));
    // ─── API ──────────────────────────────────────────────────────────────────
    const api = { cancel };
    function cancel() {
        canceled = true;
        observer.disconnect();
        disconnectObserver.disconnect();
    }
    // ─── disconnectedCallback watcher ─────────────────────────────────────────
    // Maps each tracked element to its stega result so we can fire the callback
    // when any ancestor (not just the direct parent) is removed from the DOM.
    const trackedElements = new Map();
    const disconnectObserver = new MutationObserver((mutations) => {
        if (!finalSettings.disconnectedCallback || trackedElements.size === 0)
            return;
        for (const mutation of mutations) {
            if (mutation.type !== 'childList')
                continue;
            mutation.removedNodes.forEach((removed) => {
                // Check if the removed node itself, or any of its descendants, is tracked
                trackedElements.forEach((result, $elm) => {
                    if (removed === $elm ||
                        (removed instanceof Element && removed.contains($elm))) {
                        trackedElements.delete($elm);
                        finalSettings.disconnectedCallback(result);
                    }
                });
            });
        }
    });
    disconnectObserver.observe(finalSettings.rootNode, {
        childList: true,
        subtree: true,
    });
    function watchDisconnect($elm, result) {
        if (!finalSettings.disconnectedCallback)
            return;
        trackedElements.set($elm, result);
    }
    // ─── Core: handle one stega result ────────────────────────────────────────
    function handleResult(result) {
        return __awaiter(this, void 0, void 0, function* () {
            if (canceled)
                return;
            if (finalSettings.once && hasSeen(result.$elm))
                return;
            // Reserve the element synchronously, before any await, so concurrent scans
            // of the same element (childList + attributes + characterData mutations
            // firing for the same node) can't dispatch the callback more than once.
            if (finalSettings.once)
                markSeen(result.$elm);
            // Strip the stega payload right away, as soon as it is detected, instead of
            // waiting for the (possibly deferred) `when` trigger to fulfill. Otherwise
            // the payload lingers in the DOM and gets re-detected every time the
            // framework re-renders / patches the node, calling the callback again. The
            // decoded data is already captured in `result`, so the callback still
            // receives it below.
            if (finalSettings.clean)
                cleanStega(result);
            if (finalSettings.when) {
                yield when(result.$elm, finalSettings.when);
                if (canceled)
                    return;
            }
            cb(result, api);
            watchDisconnect(result.$elm, result);
        });
    }
    // ─── Strip the stega payload from a detected element ──────────────────────
    function cleanStega(result) {
        var _a;
        // Pause the observer so stripping zero-width chars doesn't trigger a re-scan
        observer.disconnect();
        if (result.attr) {
            result.$elm.setAttribute(result.attr, vercelStegaClean((_a = result.$elm.getAttribute(result.attr)) !== null && _a !== void 0 ? _a : ''));
        }
        else {
            for (const node of Array.from(result.$elm.childNodes)) {
                if (node.nodeType === Node.TEXT_NODE && node.textContent) {
                    node.textContent = vercelStegaClean(node.textContent);
                }
            }
        }
        observer.observe(finalSettings.rootNode, {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: true,
        });
    }
    // ─── Scan one element for stega data ──────────────────────────────────────
    function scanElement($elm) {
        if (canceled)
            return;
        // Check text nodes
        for (const node of Array.from($elm.childNodes)) {
            if (node.nodeType === Node.TEXT_NODE && node.textContent) {
                const raw = extractStega(node.textContent);
                if (raw) {
                    const decoded = stega.decrypt(node.textContent);
                    if (decoded == null)
                        continue;
                    handleResult({
                        $elm,
                        stega: raw,
                        data: decoded,
                    });
                }
            }
        }
        // Check attributes
        if (finalSettings.attributes !== false) {
            for (const attr of Array.from($elm.attributes)) {
                if (Array.isArray(finalSettings.attributes) &&
                    !finalSettings.attributes.includes(attr.name)) {
                    continue;
                }
                const raw = extractStega(attr.value);
                if (raw) {
                    const decoded = stega.decrypt(attr.value);
                    if (decoded == null)
                        continue;
                    handleResult({
                        $elm,
                        attr: attr.name,
                        stega: raw,
                        data: decoded,
                    });
                }
            }
        }
    }
    // ─── Walk a subtree ────────────────────────────────────────────────────────
    function scan(root) {
        if (canceled)
            return;
        if (root instanceof HTMLElement)
            scanElement(root);
        if ('querySelectorAll' in root) {
            root
                .querySelectorAll('*')
                .forEach(($elm) => scanElement($elm));
        }
    }
    // ─── MutationObserver ─────────────────────────────────────────────────────
    const observer = new MutationObserver((mutations) => {
        if (canceled)
            return;
        for (const mutation of mutations) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => scan(node));
            }
            else if (mutation.type === 'attributes' ||
                mutation.type === 'characterData') {
                const target = mutation.target;
                if (target instanceof HTMLElement) {
                    scanElement(target);
                }
                else if (target.nodeType === Node.TEXT_NODE && target.parentElement) {
                    scanElement(target.parentElement);
                }
            }
        }
    });
    observer.observe(finalSettings.rootNode, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
    });
    // ─── Initial scan ─────────────────────────────────────────────────────────
    scan(finalSettings.rootNode);
    return api;
}
//# sourceMappingURL=queryStegaElementsLive.js.map