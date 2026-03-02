import __uniqid from '../../../js/string/uniqid.js';
export default function injectStyle(style, settings) {
    var _a;
    const finalSettings = Object.assign({ id: `injected-style-${__uniqid()}`, rootNode: undefined }, (settings !== null && settings !== void 0 ? settings : {}));
    if (document.querySelector(`#${finalSettings.id}`))
        return;
    const $tag = document.createElement('style');
    $tag.type = 'text/css';
    $tag.setAttribute('id', finalSettings.id);
    $tag.innerHTML = style;
    if (finalSettings.rootNode) {
        finalSettings.rootNode.appendChild($tag);
    }
    else {
        const $firstLink = document.querySelector('head link[rel="stylesheet"]');
        if ($firstLink) {
            (_a = $firstLink.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore($tag, $firstLink);
        }
        else {
            document.head.appendChild($tag);
        }
    }
    return $tag;
}
//# sourceMappingURL=injectStyle.js.map