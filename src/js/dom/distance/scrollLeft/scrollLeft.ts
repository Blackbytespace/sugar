/**
 * @name            scrollLeft
 * @namespace       js.dom.distance
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Get the amount of scroll left
 *
 * @todo      tests
 *
 * @snippet         scrollLeft()
 *
 * @example    js
 * import { scrollLeft } from '@blackbyte/sugar/dom'
 * scrollLeft() // 40
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivier.bossel@gmail.com)
 */
export default function scrollLeft(): number {
  return (
    window.scrollX ||
    window.pageXOffset ||
    // @ts-ignore
    document.scrollLeft ||
    document.body.scrollLeft
  );
}
