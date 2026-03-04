/**
 * @name            isHover
 * @namespace       js.is
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Check if the mouse is isHover the passed HTMLElement
 *
 * @param    {HTMLElement}    $elm    The HTMLElement to check
 * @return   {Boolean}                true if element is hover, false if not
 *
 * @snippet         isHover($1)
 *
 * @todo      tests
 *
 * @example    js
 * import { isHover } from '@blackbyte/sugar/is'
 * const $myElm = document.querySelector('.my-elm')
 * if (isHover($myElm)) {
 *   // do something
 * }
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isHover($elm) {
    return $elm.matches(':hover');
}
//# sourceMappingURL=isHover.js.map