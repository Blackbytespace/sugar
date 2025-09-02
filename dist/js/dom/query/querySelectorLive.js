var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import uniqid from '../../string/uniqid.js';
import when from '../when/when.js';
export default function querySelectorLive(selector, cb, settings, _isFirstLevel = true) {
    var _a, _b, _c, _d, _e, _f;
    let noScopeSelector, observer, canceled = false;
    const selectedNodes = [];
    // extend settings
    const finalSettings = Object.assign({ rootNode: document, once: true, afterFirst: undefined, scopes: true, firstOnly: false, attributes: [], disconnectedCallback: undefined, when: undefined }, (settings !== null && settings !== void 0 ? settings : {}));
    const innerQuerySelectorLive = [];
    // process selectors when scopes are true
    if (finalSettings.scopes) {
        noScopeSelector = selector
            .split(',')
            .map((sel) => {
            return `${sel.trim()}:not([s-scope] ${sel.trim()})`;
        })
            .join(',');
    }
    function isCanceled() {
        return selectedNodes.length && canceled && _isFirstLevel;
    }
    function cancel() {
        canceled = true;
        innerQuerySelectorLive.forEach((querySelectorLiveApi) => {
            querySelectorLiveApi.cancel();
        });
        observer === null || observer === void 0 ? void 0 : observer.disconnect();
    }
    function handleNode($node) {
        if (isCanceled()) {
            return;
        }
        // reset the "isDisconnected" flag
        if ($node._isDisconnected) {
            delete $node._isDisconnected;
        }
        // callback with our node
        cb === null || cb === void 0 ? void 0 : cb($node, {
            cancel,
        });
        // handle firstOnly setting
        if (finalSettings.firstOnly) {
            cancel();
        }
        // mark our node as selected at least 1 time
        if (!selectedNodes.includes($node)) {
            selectedNodes.push($node);
        }
        // disconnected callback
        if (finalSettings.disconnectedCallback) {
            let mutationTimeout;
            if ($node.parentNode) {
                const disconnectObserver = new MutationObserver((mutations) => {
                    clearTimeout(mutationTimeout);
                    mutationTimeout = setTimeout(() => {
                        var _a;
                        if (!$node.parentNode && !$node._isDisconnected) {
                            $node._isDisconnected = true;
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
    }
    function processNode($node, sel) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!$node.matches || isCanceled()) {
                return;
            }
            // if the node match and has not already been emitted
            if ($node.matches(selector) &&
                (!finalSettings.once || !selectedNodes.includes($node))) {
                // handle the "when" setting
                if (finalSettings.when) {
                    yield when($node, [finalSettings.when]);
                    if (isCanceled()) {
                        return;
                    }
                    handleNode($node);
                }
                else {
                    handleNode($node);
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
    if (finalSettings.scopes &&
        (finalSettings.rootNode === document ||
            // @ts-ignore
            !((_b = (_a = finalSettings.rootNode) === null || _a === void 0 ? void 0 : _a.hasAttribute) === null || _b === void 0 ? void 0 : _b.call(_a, 's-scope')))) {
        let isAfterCalledByScopeId = {};
        // search for scopes and handle nested nodes
        innerQuerySelectorLive.push(querySelectorLive('[s-scope]', ($scope) => __awaiter(this, void 0, void 0, function* () {
            // get or generate a new id
            const scopeId = $scope.id || `s-scope-${uniqid()}`;
            if ($scope.id !== scopeId) {
                $scope.setAttribute('id', scopeId);
            }
            if (isCanceled()) {
                return;
            }
            yield when($scope, ['nearViewport']);
            if (isCanceled()) {
                return;
            }
            innerQuerySelectorLive.push(querySelectorLive(selector, ($elm) => {
                processNode($elm, selector);
            }, Object.assign({}, settings, {
                rootNode: $scope,
                scopes: false,
                afterFirst() {
                    if (isAfterCalledByScopeId[scopeId] &&
                        // @ts-ignore
                        $scope._sQuerySelectorLiveScopeDirty) {
                        return;
                    }
                    // @ts-ignore
                    $scope._sQuerySelectorLiveScopeDirty = true;
                    isAfterCalledByScopeId[scopeId] = true;
                    $scope.classList.add('ready');
                    $scope.setAttribute('ready', 'true');
                },
            }), true));
        }), Object.assign({}, settings, {
            firstOnly: false,
            scopes: false,
        }), false));
        // handle things not in a scope
        innerQuerySelectorLive.push(querySelectorLive(noScopeSelector, ($elm) => {
            // findAndProcess($scope, selector);
            processNode($elm, selector);
        }, Object.assign({}, settings, {
            scopes: false,
        }), false));
        // after first callback
        (_c = finalSettings.afterFirst) === null || _c === void 0 ? void 0 : _c.call(finalSettings);
    }
    else {
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
        if ((_d = finalSettings.attributes) === null || _d === void 0 ? void 0 : _d.length) {
            observeSettings = Object.assign(Object.assign({}, observeSettings), { attributes: ((_e = finalSettings.attributes) === null || _e === void 0 ? void 0 : _e.length) ? true : false, attributeFilter: finalSettings.attributes.length
                    ? finalSettings.attributes
                    : undefined });
        }
        observer.observe(finalSettings.rootNode, observeSettings);
        // first query
        findAndProcess(finalSettings.rootNode, selector);
        // after first callback
        (_f = finalSettings.afterFirst) === null || _f === void 0 ? void 0 : _f.call(finalSettings);
    }
    return {
        cancel,
    };
}
//# sourceMappingURL=querySelectorLive.js.map