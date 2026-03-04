import { isInViewport } from '@blackbyte/sugar/is';
export default function elementsInViewport(settings = {}) {
    // extend settings
    const finalSettings = Object.assign({ rootNode: document.body, threshold: 10 }, settings);
    const $elementsInViewport = [];
    // get all elements
    const $elms = Array.from(finalSettings.rootNode.querySelectorAll('*:not(html,body,head,script,style,template)'));
    // loop on each elements until some are not in the viewport, then stop
    let currentThreshold = 0;
    for (let [i, $elm] of $elms.entries()) {
        if (currentThreshold >= finalSettings.threshold) {
            break;
        }
        if (!isInViewport($elm)) {
            currentThreshold++;
            continue;
        }
        $elementsInViewport.push($elm);
    }
    // return the elements
    return $elementsInViewport;
}
//# sourceMappingURL=elementsInViewport.js.map