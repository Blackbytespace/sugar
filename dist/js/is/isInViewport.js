/**
 * @name                isInViewport
 * @namespace           js.is
 * @type                Function
 * @platform            js
 * @status              stable
 *
 * Check if the passed HTMLElement is in the viewport or not
 *
 * @param 		{HTMLElement} 				$elm  			        The element to check if it is in viewport or not
 * @return 		{Boolean}									                If the element is in the viewport or not
 *
 * @snippet         isInViewport($1)
 *
 * @todo      tests
 *
 * @example  	js
 * import { isInViewport } from '@blackbyte/sugar/is'
 * if (isInViewport(myCoolHTMLElement) {
 *   // i'm in the viewport
 * }
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isInViewport($elm) {
    // Check if element exists
    if (!$elm)
        return false;
    // Get the bounding rectangle of the element relative to the viewport
    const rect = $elm.getBoundingClientRect();
    // Get viewport dimensions
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    // Check if element has zero dimensions (hidden elements)
    if (rect.width === 0 || rect.height === 0)
        return false;
    // Check if any part of the element is visible in the viewport
    // An element is in viewport if:
    // - Its right edge is to the right of the viewport's left edge (rect.right > 0)
    // - Its left edge is to the left of the viewport's right edge (rect.left < viewportWidth)
    // - Its bottom edge is below the viewport's top edge (rect.bottom > 0)
    // - Its top edge is above the viewport's bottom edge (rect.top < viewportHeight)
    const horizontallyVisible = rect.right > 0 && rect.left < viewportWidth;
    const verticallyVisible = rect.bottom > 0 && rect.top < viewportHeight;
    return horizontallyVisible && verticallyVisible;
}
//# sourceMappingURL=isInViewport.js.map