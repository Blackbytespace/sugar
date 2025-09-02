/**
 * @name            isFocusWithin
 * @namespace       js.is
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Check if the mouse is isFocusWithin the passed HTMLElement
 *
 * @param    {HTMLElement}    $elm    The HTMLElement to check
 *
 * @snippet         isFocusWithin($1)
 *
 * @todo      tests
 *
 * @example    js
 * import { isFocusWithin } from '@blackbyte/sugar/dom'
 * const $myElm = document.querySelector('.my-elm')
 * if (isFocusWithin($myElm)) {
 *   // do something
 * }
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isFocusWithin($elm: HTMLElement): boolean;
