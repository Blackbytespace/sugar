/**
 * @name      isInViewport
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        stable
 *
 * Check if the passed HTMLElement is in the viewport or not
 *
 * @param 		{HTMLElement} 				elm  			The element to insert
 * @param 		{Object} 					[offset=50] 	An object of top, right, bottom and left offset used to detect the status or an object with top, right, bottom and left offsets
 * @return 		{Boolean}									If the element is in the viewport or not
 *
 * @snippet         isInViewport($1)
 *
 * @todo      tests
 *
 * @example  	js
 * import { isInViewport } from '@blackbyte/sugar/dom'
 * if (isInViewport(myCoolHTMLElement) {
 * 		// i'm in the viewport
 * }
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TIsInViewport = {};

export default function isInViewport(
  elm: HTMLElement,
  settings: Partial<TIsInViewport> = {},
): boolean {
  settings = {
    ...settings,
  };

  const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop,
    scrollLeft =
      document.documentElement.scrollLeft || document.body.scrollLeft;

  const containerHeight =
      window.innerHeight || document.documentElement.clientHeight,
    containerWidth = window.innerWidth || document.documentElement.clientWidth,
    rect = elm.getBoundingClientRect();

  const top = rect.top - scrollTop,
    left = rect.left - scrollLeft,
    right = rect.right - scrollLeft,
    bottom = rect.bottom - scrollTop;

  const isTopIn = top - containerHeight <= 0,
    isBottomIn = bottom <= containerHeight,
    isLeftIn = left >= 0 && left <= containerWidth,
    isRightIn = right >= 0 && right <= containerWidth;

  // if at least top|bottom AND left|right
  if ((isTopIn || isBottomIn) && (isLeftIn || isRightIn)) {
    return true;
  }

  // is rect is bigger than viewport in all directions
  if (
    top <= 0 &&
    bottom >= containerHeight &&
    left <= 0 &&
    right >= containerWidth
  ) {
    return true;
  }

  if (top <= 0 && bottom >= containerHeight && left <= 0 && isRightIn) {
    return true;
  }

  if (
    top <= 0 &&
    bottom >= containerHeight &&
    right >= containerWidth &&
    isLeftIn
  ) {
    return true;
  }

  if (left <= 0 && right >= containerWidth && top <= 0 && isBottomIn) {
    return true;
  }

  if (
    left <= 0 &&
    right >= containerWidth &&
    bottom >= containerHeight &&
    isTopIn
  ) {
    return true;
  }

  return false;
}
