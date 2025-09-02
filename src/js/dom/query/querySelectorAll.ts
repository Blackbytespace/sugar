import isInViewport from '../../is/isInViewport.js';
import isVisible from '../../is/isVisible.js';
import closestNotVisible from './closestNotVisibleElement.js';

/**
 * @name            querySelectorAll
 * @namespace       js.dom.query
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Enhanced proxy of the Element.querySelectorAll function that let you specify
 * if you want elements that are visible, or even that are in the viewport
 *
 * @feature       Specify if you want nodes that are only inside or outside the viewport
 * @feature       Specify if you want nodes that are only visible or invisible
 *
 * @setting       {Boolean}       [visible=null]        Specify if you want only the visible nodes
 * @setting       {Boolean}       [inViewport=null]     Specify if you want only the nodes that are in the viewport
 * @setting       {HTMLElement}     [rootNode=document.body]      Specify the root node from where you want to query
 *
 * @param 		{String} 				selector 			The css selector to search
 * @param 		{Object} 				settings	 		The settings of the query
 * @return 		{Array}<HTMLElement> 						The founded elements
 *
 * @todo      tests
 *
 * @snippet         querySelectorAll($1)
 *
 * @example 	js
 * import { querySelectorAll } from '@blackbyte/sugar/dom';
 * // simple query
 * const elms = querySelectorAll('.a-cool-css-selector');
 *
 * // get elements that are in the viewport
 * const elms = querySelectorAll('.a-cool-css-selector', {
 * 		inViewport : true
 * });
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TQuerySelectorAllSettings = {
  visible: boolean | null;
  inViewport: boolean | null;
  rootNode: HTMLElement;
};

export default function querySelectorAll(
  selector: string,
  settings: Partial<TQuerySelectorAllSettings> = {},
): HTMLElement[] {
  // extend settings
  const finalSettings: TQuerySelectorAllSettings = {
    visible: null,
    inViewport: null,
    rootNode: document.body,
    ...settings,
  };

  // results array
  const results = [];

  // grab the element into the dom
  const elms = finalSettings.rootNode.querySelectorAll(selector);

  // loop on the found elements
  [].forEach.call(elms, ($elm) => {
    // check settings
    if (settings.visible === false) {
      if (isVisible($elm) || closestNotVisible($elm)) return;
    } else if (settings.visible === true) {
      if (!isVisible($elm) || !closestNotVisible($elm)) return;
    }
    if (settings.inViewport === false) {
      if (isInViewport($elm)) return;
    } else if (settings.inViewport === true) {
      if (!isInViewport($elm)) return;
    }

    // add the element to the result array
    results.push($elm);
  });

  // return the elements
  return results;
}
