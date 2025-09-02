import isInViewport from '../../is/isInViewport.js';
import isVisible from '../../is/isVisible.js';
import closestNotVisible from './closestNotVisibleElement.js';
export default function querySelectorAll(selector, settings = {}) {
    // extend settings
    const finalSettings = Object.assign({ visible: null, inViewport: null, rootNode: document.body }, settings);
    // results array
    const results = [];
    // grab the element into the dom
    const elms = finalSettings.rootNode.querySelectorAll(selector);
    // loop on the found elements
    [].forEach.call(elms, ($elm) => {
        // check settings
        if (settings.visible === false) {
            if (isVisible($elm) || closestNotVisible($elm))
                return;
        }
        else if (settings.visible === true) {
            if (!isVisible($elm) || !closestNotVisible($elm))
                return;
        }
        if (settings.inViewport === false) {
            if (isInViewport($elm))
                return;
        }
        else if (settings.inViewport === true) {
            if (!isInViewport($elm))
                return;
        }
        // add the element to the result array
        results.push($elm);
    });
    // return the elements
    return results;
}
//# sourceMappingURL=querySelectorAll.js.map