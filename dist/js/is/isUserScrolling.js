var _a, _b;
/**
 * @name      isUserScrolling
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        stable
 * @async
 *
 * Check the user is scrolling a particular element
 *
 * @param 		{HTMLElement} 				[$elm=document]  			The element to monitor
 * @return 		{Boolean}									If the element is in the viewport or not
 *
 * @snippet         isUserScrolling()
 *
 * @todo      tests
 *
 * @example  	js
 * import { isUserScrolling } from '@blackbyte/sugar/dom'
 * if (isUserScrolling(myCoolHTMLElement) {
 * 		// i'm in the viewport
 * }
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
let _isUserScrolling = false, _isUserScrollingTimeout;
try {
    (_a = document === null || document === void 0 ? void 0 : document.addEventListener) === null || _a === void 0 ? void 0 : _a.call(document, 'wheel', (e) => {
        _isUserScrolling = true;
        clearTimeout(_isUserScrollingTimeout);
        _isUserScrollingTimeout = setTimeout(() => {
            _isUserScrolling = false;
        }, 200);
    });
    (_b = document === null || document === void 0 ? void 0 : document.addEventListener) === null || _b === void 0 ? void 0 : _b.call(document, 'touchmove', (e) => {
        _isUserScrolling = true;
        clearTimeout(_isUserScrollingTimeout);
        _isUserScrollingTimeout = setTimeout(() => {
            _isUserScrolling = false;
        }, 200);
    });
}
catch (e) { }
export default function isUserScrolling($elm) {
    if ($elm._isUserInteractive !== undefined) {
        return $elm._isUserInteractive && _isUserScrolling;
    }
    $elm.addEventListener('mouseover', (e) => {
        $elm._isUserInteractive = true;
    });
    $elm.addEventListener('mouseout', (e) => {
        $elm._isUserInteractive = false;
    });
    $elm.addEventListener('touchstart', (e) => {
        $elm._isUserInteractive = true;
    });
    $elm.addEventListener('touchend', (e) => {
        $elm._isUserInteractive = false;
    });
    return $elm._isUserInteractive && _isUserScrolling;
}
//# sourceMappingURL=isUserScrolling.js.map