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
export default function unlockScroll($target?: HTMLElement | Window): void;
