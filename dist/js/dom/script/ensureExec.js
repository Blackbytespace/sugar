export default function __ensureExec($script) {
    var _a;
    let $scripts = [];
    if ($script instanceof HTMLScriptElement) {
        $scripts = [$script];
    }
    else if ($script instanceof NodeList) {
        $scripts = Array.from($script).filter((el) => el instanceof HTMLScriptElement);
    }
    else if (Array.isArray($script)) {
        $scripts = $script.filter((el) => el instanceof HTMLScriptElement);
    }
    for (const $s of $scripts) {
        const newScriptEl = document.createElement('script');
        Array.from($s.attributes).forEach((attr) => {
            newScriptEl.setAttribute(attr.name, attr.value);
        });
        const scriptText = document.createTextNode($s.innerHTML);
        newScriptEl.appendChild(scriptText);
        (_a = $s.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(newScriptEl, $s);
    }
}
//# sourceMappingURL=ensureExec.js.map