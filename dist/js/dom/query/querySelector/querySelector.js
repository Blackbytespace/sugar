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
    // grab the element into the dom
    const $elm = finalSettings.$rootNode.querySelector(selector);
    // if no element, stop here
    if (!$elm)
        return;
    // check finalSettings
    if (finalSettings.visible === false) {
        if (isVisible($elm) || closestNotVisibleElement($elm))
            return;
    }
    else if (finalSettings.visible === true) {
        if (!isVisible($elm) || !closestNotVisibleElement($elm))
            return;
    }
    if (finalSettings.inViewport === false) {
        if (isInViewport($elm))
            return;
    }
    else if (finalSettings.inViewport === true) {
        if (!isInViewport($elm))
            return;
    }
    // return the element
    return $elm;
}
//# sourceMappingURL=querySelector.js.map