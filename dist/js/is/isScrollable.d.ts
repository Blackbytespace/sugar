/**
 * @name      isScrollable
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        stable
 *
 * Check if the passed element is scrollable or not
 *
 * @return    {Boolean}    true if is scrollable, false if not
 *
 * @snippet         isScrollable($1)
 *
 * @todo      tests
 *
 * @example    js
 * import { isScrollable } from '@blackbyte/sugar/dom'
 * if (isScrollable($myElement)) {
 *   // do something
 * }
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TIsScrollableSettings = {
    x: boolean;
    y: boolean;
};
export default function isScrollable($elm: HTMLElement, settings?: Partial<TIsScrollableSettings>): boolean;
