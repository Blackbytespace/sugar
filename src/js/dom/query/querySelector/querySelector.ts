import { isInViewport } from '@blackbyte/sugar/is';
import { isVisible } from '@blackbyte/sugar/is';
import closestNotVisibleElement from '../closestNotVisibleElement/closestNotVisibleElement.js';

/**
 * @name            querySelector
 * @namespace       js.dom.query
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Enhanced proxy of the Element.querySelector function that let you specify
 * if you want an element that is visible, or even that is in the viewport
 *
 * @feature       Specify if you want nodes that are only inside or outside the viewport
 * @feature       Specify if you want nodes that are only visible or invisible
 *
 * @setting       {Boolean}         [visible=null]                Specify if you want only the visible nodes
 * @setting       {Boolean}         [inViewport=null]             Specify if you want only the nodes that are in the viewport
 * @setting       {HTMLElement}     [$rootNode=document.body]     Specify the root node from where you want to query
 *
 * @param 		{String} 			selector 			The css selector to search
 * @param 		{Object} 			settings	 		The settings of the query
 * @return 		{HTMLElement} 							The founded element
 *
 * @snippet         querySelector($1)
 *
 * @todo      tests
 *
 * @example 	js
 * import { querySelector } from '@blackbyte/sugar/dom';
 * // simple query
 * const elm = querySelector('.a-cool-css-selector');
 *
 * // get an element that is in the viewport
 * const elm = querySelector('.a-cool-css-selector', {
 *   inViewport : true
 * });
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TQuerySelectorSettings = {
  visible: boolean | null;
  inViewport: boolean | null;
  $rootNode: HTMLElement;
};

export default function querySelector(
  selector: string,
  settings: Partial<TQuerySelectorSettings> = {},
): HTMLElement | undefined {
  // extend settings
  const finalSettings: TQuerySelectorSettings = {
    visible: null,
    inViewport: null,
    $rootNode: document.body,
    ...settings,
  };

  // compatibility only
  // @ts-ignore
  if (finalSettings.rootNode) {
    // @ts-ignore
    finalSettings.$rootNode = finalSettings.rootNode;
  }

  // grab all matching elements and find the first one that matches our criteria
  const allElements = Array.from(finalSettings.$rootNode.querySelectorAll(selector)) as HTMLElement[];
  
  for (const $elm of allElements) {
    // check finalSettings
    if (finalSettings.visible === false) {
      // For visible=false, we want elements that are NOT visible (either themselves or via ancestors)
      if (!isVisible($elm) || closestNotVisibleElement($elm)) {
        // Check viewport setting if specified
        if (finalSettings.inViewport === false) {
          if (!isInViewport($elm)) return $elm;
        } else if (finalSettings.inViewport === true) {
          if (isInViewport($elm)) return $elm;
        } else {
          return $elm; // No viewport filter
        }
      }
    } else if (finalSettings.visible === true) {
      // For visible=true, we want elements that ARE visible (both themselves and ancestors)
      if (isVisible($elm) && !closestNotVisibleElement($elm)) {
        // Check viewport setting if specified
        if (finalSettings.inViewport === false) {
          if (!isInViewport($elm)) return $elm;
        } else if (finalSettings.inViewport === true) {
          if (isInViewport($elm)) return $elm;
        } else {
          return $elm; // No viewport filter
        }
      }
    } else {
      // No visibility filter, just check viewport
      if (finalSettings.inViewport === false) {
        if (!isInViewport($elm)) return $elm;
      } else if (finalSettings.inViewport === true) {
        if (isInViewport($elm)) return $elm;
      } else {
        return $elm; // No filters at all
      }
    }
  }

  // No matching element found
  return;
}
