/**
 * @name            whenAnimationEnd
 * @namespace       js.dom.when
 * @type            Function
 * @platform        js
 * @status          stable
 * @async
 *
 * Detect when animation ends
 *
 * @param    {HTMLElement}    elm    The element to listen on
 * @return   {Promise<HTMLElement>}                  A promise that will be resolved once the animation has ended
 *
 * @snippet         whenAnimationEnd($1)
 * whenAnimationEnd($1).then(\$elm => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example    js
 * import { whenAnimationEnd } from '@blackbyte/sugar/dom'
 * whenAnimationEnd(myCoolElm).then(($elm) => {
 *      // do something...
 * });
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function whenAnimationEnd($elm: HTMLElement): Promise<HTMLElement>;
