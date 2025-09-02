/**
 * @name                injectIframeContent
 * @namespace           js.dom.inject
 * @type                Function
 * @platform            js
 * @status              stable
 *
 * Inject some content into an iframe
 *
 * @param       {HTMLIFrameElement}        $iframe          The iframe element to inject content into
 * @param    {String}    html           The html to inject
 *
 * @snippet         injectIframeContent($1, $2)
 *
 * @todo      tests
 *
 * @example    js
 * import { injectIframeContent } from '@blackbyte/sugar/dom'
 *  injectIframeContent($myIframe, '<html>...</html>');
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function injectIframeContent($iframe, html) {
    var _a, _b, _c;
    (_a = $iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.document.open();
    (_b = $iframe.contentWindow) === null || _b === void 0 ? void 0 : _b.document.write(html);
    (_c = $iframe.contentWindow) === null || _c === void 0 ? void 0 : _c.document.close();
}
//# sourceMappingURL=injectIframeContent.js.map