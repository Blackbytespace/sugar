/**
 * @name          isFocus
 * @namespace     js.is
 * @type          Function
 * @platform      js
 * @status        stable
 *
 * Check if the mouse is focus the passed HTMLElement
 *
 * @param    {HTMLElement}    $elm    The HTMLElement to check
 *
 * @snippet         isFocus($1)
 *
 * @todo      tests
 *
 * @example    js
 * import { isFocus } from '@blackbyte/sugar/dom'
 * const $myElm = document.querySelector('.my-elm')
 * if (isFocus($myElm)) {
 *   // do something
 * }
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isFocus($elm: HTMLElement): boolean;
