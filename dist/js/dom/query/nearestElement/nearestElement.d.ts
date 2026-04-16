/**
 * @name            nearestElement
 * @namespace       js.dom.query
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Get the nearest element from the passed one from the passed elements list.
 * You can pass a direction like "top", "right", "bottom", "left" to specify
 * the direction you want to search the nearest element.
 *
 * @param           {HTMLElement}                 $from             The element from which to start the search
 * @param           {NodeListOf<HTMLElement>|HTMLElement[]}               $elements         The elements list to search in
 * @param           {TNearestElementSettings}     [settings={}]     Some settings to configure your search
 * @return          {HTMLElement}                                   The nearest element found
 *
 * @setting         {'top' | 'right' | 'bottom' | 'left'}          [direction]        The direction to search in. Can be "top", "right", "bottom", "left"
 *
 * @todo      tests
 *
 * @snippet         nearestElement($1, $2, $3)
 *
 * @example    js
 * import { nearestElement } from '@blackbyte/sugar/dom'
 * nearestElement($elm, document.querySelectorAll('.my-cool-elements'), {
 *   direction: 'top'
 * });
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivier.bossel@gmail.com)
 */
export type TNearestElementSettings = {
    direction?: 'top' | 'right' | 'bottom' | 'left';
};
export default function nearestElement($from: HTMLElement, $elements: HTMLElement[] | NodeListOf<HTMLElement>, settings?: TNearestElementSettings): HTMLElement | undefined;
