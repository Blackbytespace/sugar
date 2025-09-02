import uniqid from '../../string/uniqid.js';
export default function reloadStylesheets(settings) {
    var _a;
    const finalSettings = Object.assign({ $root: document }, (settings !== null && settings !== void 0 ? settings : {}));
    // loop on all stylesheetgs link and add the timestamp in
    Array.from((_a = finalSettings.$root.querySelectorAll('link[rel=stylesheet]')) !== null && _a !== void 0 ? _a : []).forEach(($link) => {
        var _a;
        const id = (_a = $link.id) !== null && _a !== void 0 ? _a : uniqid();
        // clone the link element
        const $newLink = $link.cloneNode();
        $newLink.href = $link.href.replace(/\?.*|$/, '?' + Date.now());
        // listen when fully loaded
        $newLink.addEventListener('load', (e) => {
            var _a;
            // remove old css's
            Array.from((_a = finalSettings.$root.querySelectorAll(`link[id="${id}"]`)) !== null && _a !== void 0 ? _a : []).forEach(($remove) => {
                if ($remove === $newLink)
                    return;
                $remove.remove();
            });
        });
        // add the new link after the one to reload
        $link.after($newLink);
    });
}
//# sourceMappingURL=reloadStylesheets.js.map