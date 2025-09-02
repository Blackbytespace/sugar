import isInViewport from '../../is/isInViewport.js';

/**
 * @name            elementsInViewport
 * @namespace       js.dom.query
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Get all the elements that are in viewport
 *
 * @setting       {HTMLElement}     [rootNode=document.body]      Specify the root node from where you want to query
 *
 * @param 		{Object} 			settings	 		The settings of the query
 * @return 		{HTMLElement} 							The founded element
 *
 * @snippet         elementsInViewport($1)
 *
 * @todo      tests
 *
 * @example 	js
 * import { elementsInViewport } from '@blackbyte/sugar/dom';
 * const $elements = elementsInViewport();
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TElementsInViewportSettings = {
  rootNode: HTMLElement;
  threshold: number;
};

export default function elementsInViewport(
  settings: Partial<TElementsInViewportSettings> = {},
): HTMLElement[] {
  // extend settings
  const finalSettings: TElementsInViewportSettings = {
    rootNode: document.body,
    threshold: 10,
    ...settings,
  };

  const $elementsInViewport: HTMLElement[] = [];

  // get all elements
  const $elms = Array.from(
    settings.rootNode?.querySelectorAll(
      '*:not(html,body,head,script,style,template)',
    ) ?? [],
  );

  // loop on each elements until some are not in the viewport, then stop
  let currentThreshold = 0;
  for (let [i, $elm] of $elms.entries()) {
    if (currentThreshold >= finalSettings.threshold) {
      break;
    }
    if (!isInViewport($elm as HTMLElement)) {
      currentThreshold++;
      continue;
    }
    $elementsInViewport.push($elm as HTMLElement);
  }

  // return the elements
  return $elementsInViewport;
}
