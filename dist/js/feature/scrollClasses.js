/**
 * @name            scrollClasses
 * @namespace       js.dom.feature
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * This feature allows you to have `-scrolled`, `-scrolled-x`, `-scrolled-y`, `-scrolled-up` and `-scrolled-down` classes added and removed from
 * the body depending on an scroll offset that can be set by:
 * 1. `-scrolled`: Added when passed the `offset` set in the settings
 * 2. `-scrolled-x`: Added when passed the `offsetX` set in the settings
 * 3. `-scrolled-y`: Added when passed the `offsetY` set in the settings
 * 4. `-scrolled-up`: Added when the user scrolls up (no offset)
 * 5. `-scrolled-down`: Added when the user scrolls down (no offset)
 *
 * Note that you can specify these settings in the CSS with the following variables:
 * - `--s-scrolled-classes-offset`: The offset you want before adding the classes
 * - `--s-scrolled-classes-offset-x`: The offset x you want before adding the classes
 * - `--s-scrolled-classes-offset-y`: The offset y you want before adding the classes
 * - `--s-scrolled-classes-class`: The class name you want. Will be used also in the %cls-x and %cls-y classes
 *
 * @param           {TScrollClassesSettings}          [settings={}]           The settings you want to override
 *
 * @setting         {number}        [offset=100]        The offset you want before adding the classes
 * @setting         {number}        [offsetX=null]             The offset x you want before adding the classes
 * @setting         {number}        [offsetY=null]             The offset y you want before adding the classes
 * @setting         {string}        [class=scrolled]        The class name you want. Will be used also in the %cls-x and %cls-y classes
 *
 * @snippet          scrollClasses($1);
 *
 * @example         js
 * import { scrollClasses } from '@blackbyte/sugar/features';
 * scrollClasses({
 *      class: 'hello',
 *      offset: 200
 * });
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function scrollClasses(settings) {
    const style = window.getComputedStyle(document.body);
    const finalSettings = Object.assign({ offset: parseInt(style.getPropertyValue('--s-scrolled-classes-offset') || '0') ||
            100, offsetX: parseInt(style.getPropertyValue('--s-scrolled-classes-offset-x') || '0'), offsetY: parseInt(style.getPropertyValue('--s-scrolled-classes-offset-y') || '0'), class: style.getPropertyValue('--s-scrolled-classes-class') || 'scrolled' }, (settings !== null && settings !== void 0 ? settings : {}));
    let currentX = window.scrollX, currentY = window.scrollY;
    const offsetX = finalSettings.offsetX !== 0
        ? finalSettings.offsetX
        : finalSettings.offset, offsetY = finalSettings.offsetY !== 0
        ? finalSettings.offsetY
        : finalSettings.offset;
    function handleScroll() {
        let isScrolled = false;
        // scrolled up/down class
        if (window.scrollY > currentY) {
            document.body.classList.remove(`${finalSettings.class}-up`);
            if (!document.body.classList.contains(`${finalSettings.class}-down`)) {
                document.body.classList.add(`${finalSettings.class}-down`);
            }
        }
        else if (window.scrollY < currentY) {
            document.body.classList.remove(`${finalSettings.class}-down`);
            if (!document.body.classList.contains(`${finalSettings.class}-up`)) {
                document.body.classList.add(`${finalSettings.class}-up`);
            }
        }
        if (window.scrollY >= offsetY) {
            if (!document.body.classList.contains(`${finalSettings.class}-y`)) {
                document.body.classList.add(`${finalSettings.class}-y`);
            }
            isScrolled = true;
        }
        else {
            if (document.body.classList.contains(`${finalSettings.class}-y`)) {
                document.body.classList.remove(`${finalSettings.class}-y`);
            }
        }
        if (window.scrollX >= offsetX) {
            if (!document.body.classList.contains(`${finalSettings.class}-x`)) {
                document.body.classList.add(`${finalSettings.class}-x`);
            }
            isScrolled = true;
        }
        else {
            if (document.body.classList.contains(`${finalSettings.class}-x`)) {
                document.body.classList.remove(`${finalSettings.class}-x`);
            }
        }
        if (isScrolled) {
            if (!document.body.classList.contains(finalSettings.class)) {
                document.body.classList.add(finalSettings.class);
            }
        }
        else {
            if (document.body.classList.contains(finalSettings.class)) {
                document.body.classList.remove(finalSettings.class);
            }
        }
        currentX = window.scrollX;
        currentY = window.scrollY;
        requestAnimationFrame(handleScroll);
    }
    requestAnimationFrame(handleScroll);
}
//# sourceMappingURL=scrollClasses.js.map