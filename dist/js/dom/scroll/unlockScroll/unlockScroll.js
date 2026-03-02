import { lockScrollPreventDefault, lockScrollPreventDefaultForScrollKeys, } from './lockScroll/lockScroll.js';
/**
 * @name            unlockScroll
 * @namespace       js.dom.scroll
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Unlock the scroll of the page
 *
 * @param    {HTMLElement|Window}       	[$target=window]        The target on which to lock the scroll (default to window)
 *
 * @snippet         unlockScroll()
 *
 * @todo      tests
 *
 * @example  	js
 * import { unlockScroll } from '@blackbyte/sugar/dom'
 * unlockScroll();
 *
 * @since          1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function unlockScroll($target = window) {
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
    var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
    $target.removeEventListener('DOMMouseScroll', lockScrollPreventDefault, false); // older FF
    $target.removeEventListener(wheelEvent, lockScrollPreventDefault); // modern desktop
    $target.removeEventListener('touchmove', lockScrollPreventDefault); // mobile
    if ($target instanceof Window) {
        $target.removeEventListener('keydown', lockScrollPreventDefaultForScrollKeys, false);
    }
}
//# sourceMappingURL=unlockScroll.js.map