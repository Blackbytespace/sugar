var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import when from '../when/when.js';
export default function querySelectorLive(selector, cb, settings, _isFirstLevel = true) {
    var _a, _b, _c;
    let observer, canceled = false;
    console.trace('SS', selector);
    const matchedNodes = new WeakMap();
    // extend settings
    const finalSettings = Object.assign({ rootNode: document, once: true, afterFirst: undefined, firstOnly: false, attributes: [], disconnectedCallback: undefined, when: undefined }, (settings !== null && settings !== void 0 ? settings : {}));
    const innerQuerySelectorLive = [];
    function isCanceled() {
        return canceled && _isFirstLevel;
    }
    function cancel() {
        canceled = true;
        innerQuerySelectorLive.forEach((querySelectorLiveApi) => {
            querySelectorLiveApi.cancel();
        });
        observer === null || observer === void 0 ? void 0 : observer.disconnect();
    }
    function processNode($node, sel) {
        return __awaiter(this, void 0, void 0, function* () {
            // if is canceled
            if (isCanceled()) {
                return;
            }
            // if the process has been canceled or the node is not an element
            if (!$node.matches || isCanceled()) {
                return;
            }
            // if already matched and "once" setting is true
            if (finalSettings.once && matchedNodes.has($node)) {
                return;
            }
            // if not match
            if (!$node.matches(selector)) {
                return;
            }
            // track matched nodes
            matchedNodes.set($node, true);
            // when
            if (finalSettings.when) {
                yield when($node, [finalSettings.when]);
                if (isCanceled()) {
                    return;
                }
            }
            // handle node
            // callback with our node
            cb === null || cb === void 0 ? void 0 : cb($node, {
                cancel,
            });
            // handle firstOnly setting
            if (finalSettings.firstOnly) {
                cancel();
            }
            // disconnected callback
            if (finalSettings.disconnectedCallback) {
                let mutationTimeout;
                if ($node.parentNode) {
                    const disconnectObserver = new MutationObserver((mutations) => {
                        clearTimeout(mutationTimeout);
                        mutationTimeout = setTimeout(() => {
                            var _a;
                            if (!$node.parentNode) {
                                (_a = finalSettings.disconnectedCallback) === null || _a === void 0 ? void 0 : _a.call(finalSettings, $node);
                                disconnectObserver.disconnect();
                            }
                        });
                    });
                    disconnectObserver.observe($node.parentNode, {
                        childList: true,
                    });
                }
            }
            // search inside our node
            findAndProcess($node, sel);
        });
    }
    function findAndProcess($root, sel) {
        if (!$root.querySelectorAll || isCanceled()) {
            return;
        }
        const nodes = Array.from($root === null || $root === void 0 ? void 0 : $root.querySelectorAll(sel));
        nodes.forEach(($node) => {
            processNode($node, sel);
        });
    }
    observer = new MutationObserver((mutations, obs) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName) {
                processNode(mutation.target, selector);
            }
            if (mutation.addedNodes) {
                mutation.addedNodes.forEach(($node) => {
                    processNode($node, selector);
                });
            }
        });
    });
    let observeSettings = {
        childList: true,
        subtree: true,
    };
    selector
        .split(',')
        .map((l) => l.trim())
        .forEach((sel) => {
        const attrMatches = sel.match(/\[[^\]]+\]/gm);
        if (attrMatches === null || attrMatches === void 0 ? void 0 : attrMatches.length) {
            attrMatches.forEach((attrStr) => {
                var _a, _b;
                const attrName = attrStr
                    .split('=')[0]
                    .replace(/^\[/, '')
                    .replace(/\]$/, '');
                if (!((_a = finalSettings.attributes) === null || _a === void 0 ? void 0 : _a.includes(attrName))) {
                    (_b = finalSettings.attributes) === null || _b === void 0 ? void 0 : _b.push(attrName);
                }
            });
        }
    });
    if ((_a = finalSettings.attributes) === null || _a === void 0 ? void 0 : _a.length) {
        observeSettings = Object.assign(Object.assign({}, observeSettings), { attributes: ((_b = finalSettings.attributes) === null || _b === void 0 ? void 0 : _b.length) ? true : false, attributeFilter: finalSettings.attributes.length
                ? finalSettings.attributes
                : undefined });
    }
    observer.observe(finalSettings.rootNode, observeSettings);
    // first query
    findAndProcess(finalSettings.rootNode, selector);
    // after first callback
    (_c = finalSettings.afterFirst) === null || _c === void 0 ? void 0 : _c.call(finalSettings);
    return {
        cancel,
    };
}
//# sourceMappingURL=querySelectorLive.js.map