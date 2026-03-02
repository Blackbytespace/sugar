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
export declare function lockScrollPreventDefault(e: Event): void;
export declare function lockScrollPreventDefaultForScrollKeys(e: KeyboardEvent): boolean | void;
export default function lockScroll($target?: HTMLElement | Window): void;
