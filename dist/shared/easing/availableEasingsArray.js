/**
 * @name                availableEasingsArray
 * @namespace           shared.easing
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * This function simply return back an array of all the available easings function in the sugar toolkit
 *
 * @return      {Array}             An array of all the easing functions available
 *
 * @snippet         availableEasingsArray()
 *
 * @example         js
 * import { availableEasingsArray } from '@blackbyte/sugar/easing';
 * availableEasingsArray();
 *
 * @todo      tests
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function availableEasingsArray() {
    return [
        'easeInOutCubic',
        'easeInOutQuad',
        'easeInOutQuart',
        'easeInOutQuint',
        'easeInCubic',
        'easeInQuad',
        'easeInQuart',
        'easeInQuint',
        'easeOutCubic',
        'easeOutQuad',
        'easeOutQuart',
        'easeOutQuint',
    ];
}
//# sourceMappingURL=availableEasingsArray.js.map