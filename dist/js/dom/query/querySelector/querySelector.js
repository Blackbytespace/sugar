import { isInViewport } from '@blackbyte/sugar/is';
import { isVisible } from '@blackbyte/sugar/is';
import closestNotVisibleElement from '../closestNotVisibleElement/closestNotVisibleElement.js';
export default function querySelector(selector, settings = {}) {
    // extend settings
    const finalSettings = Object.assign({ visible: null, inViewport: null, $rootNode: document.body }, settings);
    // compatibility only
    // @ts-ignore
    if (finalSettings.rootNode) {
        // @ts-ignore
        finalSettings.$rootNode = finalSettings.rootNode;
    }
    // grab all matching elements and find the first one that matches our criteria
    const allElements = Array.from(finalSettings.$rootNode.querySelectorAll(selector));
    for (const $elm of allElements) {
        // check finalSettings
        if (finalSettings.visible === false) {
            // For visible=false, we want elements that are NOT visible (either themselves or via ancestors)
            if (!isVisible($elm) || closestNotVisibleElement($elm)) {
                // Check viewport setting if specified
                if (finalSettings.inViewport === false) {
                    if (!isInViewport($elm))
                        return $elm;
                }
                else if (finalSettings.inViewport === true) {
                    if (isInViewport($elm))
                        return $elm;
                }
                else {
                    return $elm; // No viewport filter
                }
            }
        }
        else if (finalSettings.visible === true) {
            // For visible=true, we want elements that ARE visible (both themselves and ancestors)
            if (isVisible($elm) && !closestNotVisibleElement($elm)) {
                // Check viewport setting if specified
                if (finalSettings.inViewport === false) {
                    if (!isInViewport($elm))
                        return $elm;
                }
                else if (finalSettings.inViewport === true) {
                    if (isInViewport($elm))
                        return $elm;
                }
                else {
                    return $elm; // No viewport filter
                }
            }
        }
        else {
            // No visibility filter, just check viewport
            if (finalSettings.inViewport === false) {
                if (!isInViewport($elm))
                    return $elm;
            }
            else if (finalSettings.inViewport === true) {
                if (isInViewport($elm))
                    return $elm;
            }
            else {
                return $elm; // No filters at all
            }
        }
    }
    // No matching element found
    return;
}
//# sourceMappingURL=querySelector.js.map