/**
 * @name            whenIframeReady
 * @namespace       js.dom.when
 * @type            Function
 * @platform        js
 * @status          stable
 * @async
 *
 * Wait until the passed iframe is ready to be used
 *
 * @param       {HTMLIframeElement}         $iframe          The iframe to wait on
 * @return 		{Promise<HTMLIframeElement>} 					A promise that will be resolved when an interaction has been made
 *
 * @snippet         whenIframeReady($1)
 * whenIframeReady($1).then(\$elm => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example  	js
 * import { whenIframeReady } from '@blackbyte/sugar/dom'
 * whenIframeReady($myCoolIframe).then($iframe => {
 *      // do something...
 * });
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function whenIframeReady($iframe) {
    return new Promise((resolve) => {
        var _a, _b;
        if ((_b = (_a = $iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.body) {
            return resolve($iframe);
        }
        let int = setInterval(() => {
            var _a, _b;
            if ((_b = (_a = $iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.body) {
                clearInterval(int);
                resolve(null);
            }
        }, 10);
    });
}
//# sourceMappingURL=whenIframeReady.js.map