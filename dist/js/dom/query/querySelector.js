import isInViewport from '../../is/isInViewport.js';
import isVisible from '../../is/isVisible.js';
import closestNotVisibleElement from './closestNotVisibleElement.js';
export default function querySelector(selector, settings = {}) {
    // extend settings
    const finalSettings = Object.assign({ visible: null, inViewport: null, rootNode: document.body }, settings);
    // grab the element into the dom
    const $elm = finalSettings.rootNode.querySelector(selector);
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