/**
 * @name            isFocusWithin
 * @namespace       js.is
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Check if the mouse is isFocusWithin the passed HTMLElement
 *
 * @param     {HTMLElement}    $elm     The HTMLElement to check
 * @return    {Boolean}                 true if element is focus within, false if not
 *
 * @snippet         isFocusWithin($1)
 *
 * @todo      tests
 *
 * @example    js
 * import { isFocusWithin } from '@blackbyte/sugar/is'
 * const $myElm = document.querySelector('.my-elm')
 * if (isFocusWithin($myElm)) {
 *   // do something
 * }
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isFocusWithin($elm: HTMLElement): boolean {
  return $elm.matches(':focus-within');
}
