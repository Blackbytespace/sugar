import distanceBetween from '../../../shared/math/distanceBetween.js';

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
 * @param           {HTMLElement}           $from            The element from which to start the search
 * @param           {HTMLElement[]}          $elements       The elements list to search in
 * @param           {TNearestElementSettings}         [settings={}]       Some settings to configure your search
 * @return        {HTMLElement}                           The nearest element found
 *
 * @todo      tests
 *
 * @snippet         nearestElement($1, $2, $3)
 *
 * @example    js
 * import { nearestElement } from '@blackbyte/sugar/dom'
 * nearestElement(myCoolElement, document.querySelectorAll('.my-cool-elements'), {
 *      direction: 'top'
 * });
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivier.bossel@gmail.com)
 */
export type TNearestElementSettings = {
  direction?: 'top' | 'right' | 'bottom' | 'left';
};

export default function nearestElement(
  $from: HTMLElement,
  $elements: HTMLElement[] | NodeListOf<HTMLElement>,
  settings?: TNearestElementSettings,
): HTMLElement | undefined {
  const finalParams: TNearestElementSettings = {
    ...(settings ?? {}),
  };

  let $nearestElement: HTMLElement,
    nearestDistance: Number = Infinity;

  const fromElmBound = $from.getBoundingClientRect();

  for (let [i, $elm] of Object.entries($elements)) {
    if ($elm === $from) {
      continue;
    }

    const elmBound = (<HTMLElement>$elm).getBoundingClientRect();

    let distance: Number;

    switch (finalParams.direction) {
      case 'top':
        if (elmBound.top > fromElmBound.top) {
          continue;
        }
        break;
      case 'right':
        if (elmBound.left < fromElmBound.right) {
          continue;
        }
        break;
      case 'bottom':
        if (elmBound.bottom < fromElmBound.bottom) {
          continue;
        }
        break;
      case 'left':
        if (elmBound.right > fromElmBound.left) {
          continue;
        }

        break;
    }

    distance = distanceBetween(fromElmBound, elmBound);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      $nearestElement = $elm as HTMLElement;
    }
  }

  // @ts-ignore
  return $nearestElement;
}
