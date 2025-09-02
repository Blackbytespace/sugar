/**
 * @name            iframeAutoSize
 * @namespace       js.dom.iframe
 * @type            Function
 * @platform        js
 * @status          stable
 * @async
 *
 * This function allows you to resize an iframe to fit its content.
 *
 * @param           {HTMLElement}           obj           The iframe element to resize
 * @param           {TIFrameAutoSizeSettings}           [settings={}]           Some settings to configure your iframe auto size
 *
 * @setting        {Boolean}         [width=true]         Specify if you want to resize the width of the iframe
 * @setting        {Boolean}         [height=true]        Specify if you want to resize the height of the iframe
 *
 * @snippet         iframeAutoSize($1)
 * iframeAutoSize($1, $2);
 *
 * @todo      tests
 *
 * @example  	js
 * import { iframeAutoSize } from '@blackbyte/sugar/dom';
 * iframeAutoSize($1, $2);
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function iframeAutoSize($iframe, settings) {
    var _a;
    const finalSettings = Object.assign({ width: true, height: true }, settings);
    function _resize() {
        var _a, _b;
        if (finalSettings.width) {
            $iframe.style.width = 0 + 'px';
            $iframe.style.width =
                ((_a = $iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.document.documentElement.scrollWidth) + 'px';
            setTimeout(() => {
                var _a;
                if ((_a = $iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.document.body.scrollWidth) {
                    _resize();
                }
            }, 100);
        }
        if (finalSettings.height) {
            $iframe.style.height = 0 + 'px';
            $iframe.style.height =
                ((_b = $iframe.contentWindow) === null || _b === void 0 ? void 0 : _b.document.documentElement.scrollHeight) + 'px';
            setTimeout(() => {
                var _a;
                if ((_a = $iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.document.body.scrollHeight) {
                    _resize();
                }
            }, 100);
        }
    }
    $iframe.addEventListener('load', () => {
        var _a, _b;
        // resize on load
        _resize;
        // resize on image load
        (_a = $iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.document.body.querySelectorAll('img').forEach(($img) => {
            $img.addEventListener('load', () => {
                _resize();
            });
        });
        // observe for changes in the iframe content
        const observer = new MutationObserver((mutations) => {
            setTimeout(() => {
                _resize();
            });
        });
        observer.observe((_b = $iframe.contentWindow) === null || _b === void 0 ? void 0 : _b.document.body, {
            attributes: true,
            childList: true,
            subtree: true,
        });
    });
    (_a = $iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.addEventListener('resize', _resize);
}
//# sourceMappingURL=iframeAutoSize.js.map