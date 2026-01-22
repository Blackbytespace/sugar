/**
 * @name            lockScroll
 * @namespace       js.dom.scroll
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Lock the scroll of the page
 *
 * @param    {HTMLElement|Window}       	[$target=window]        The target on which to lock the scroll (default to window)
 *
 * @snippet         lockScroll()
 *
 * @todo      tests
 *
 * @example  	js
 * import { lockScroll } from '@blackbyte/sugar/dom'
 * lockScroll();
 *
 * @since          1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export function lockScrollPreventDefault(e) {
    e.preventDefault();
}
export function lockScrollPreventDefaultForScrollKeys(e) {
    // left: 37, up: 38, right: 39, down: 40
    var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
    if (keys[e.keyCode]) {
        lockScrollPreventDefault(e);
        return false;
    }
}
export default function lockScroll($target = window) {
    // modern Chrome requires { passive: false } when adding event
    let supportsPassive = false;
    try {
        // @ts-ignore
        window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassive = true;
            },
        }));
    }
    catch (e) { }
    var wheelOpt = supportsPassive ? { passive: false } : false;
    var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
    $target.addEventListener('DOMMouseScroll', lockScrollPreventDefault, false); // older FF
    $target.addEventListener(wheelEvent, lockScrollPreventDefault, wheelOpt); // modern desktop
    $target.addEventListener('touchmove', lockScrollPreventDefault, wheelOpt); // mobile
    if ($target instanceof Window) {
        $target.addEventListener('keydown', lockScrollPreventDefaultForScrollKeys, false);
    }
}
//# sourceMappingURL=lockScroll.js.map