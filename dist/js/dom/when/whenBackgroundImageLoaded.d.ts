/**
 * @name            whenBackgroundImageLoaded
 * @namespace       js.dom.when
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Detect when a background image has been loaded on an HTMLElement
 *
 * @feature       Promise based API
 *
 * @param    {HTMLElement}    $elm    The HTMLElement on which to detect the background image load
 * @return    {SPromise}    A promise that will be resolved when the background image has been loaded
 *
 * @snippet         whenBackgroundImageLoaded($1)
 * whenBackgroundImageLoaded($1).then(\$elm => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example    js
 * import { whenBackgroundImageLoaded } from '@blackbyte/sugar/dom'
 *
 * // using promise
 * await whenBackgroundImageLoaded($elm);
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function whenBackgroundImageLoaded($elm: HTMLElement): Promise<HTMLElement>;
