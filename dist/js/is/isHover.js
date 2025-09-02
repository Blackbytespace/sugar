/**
 * @name      isHover
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        stable
 *
 * Check if the mouse is isHover the passed HTMLElement
 *
 * @param    {HTMLElement}    $elm    The HTMLElement to check
 *
 * @snippet         isHover($1)
 *
 * @todo      tests
 *
 * @example    js
 * import { isHover } from '@blackbyte/sugar/dom'
 * const $myElm = document.querySelector('.my-elm')
 * if (isHover($myElm)) {
 *   // do something
 * }
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isHover($elm) {
    var _a;
    return ((_a = $elm.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector(':isHover')) === $elm;
}
//# sourceMappingURL=isHover.js.map