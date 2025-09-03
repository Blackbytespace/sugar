/**
 * @name            sectionClasses
 * @namespace       js.dom.feature
 * @type            Function
 * @platform        js
 * @status          stable
 *
 *
 * This feature allows you to add some classes on your sections when they are in the viewport, near the viewport, etc...
 * 1. `-in-viewport`: Added when the section is in the viewport
 * 2. `-near-viewport`: Added when the section is near the viewport (100px by default)
 *
 * @param           {TSectionClassesSettings}          [settings={}]           The settings you want to override
 *
 * @setting         {number}        [offset=100]        The offset you want before adding the classes
 * @setting         {number}        [offsetX=null]             The offset x you want before adding the classes
 * @setting         {number}        [offsetY=null]             The offset y you want before adding the classes
 * @setting         {string}        [class=scrolled]        The class name you want. Will be used also in the %cls-x and %cls-y classes
 *
 * @snippet          sectionClasses($1);
 *
 * @example         js
 * import { sectionClasses } from '@blackbyte/sugar/features';
 * sectionClasses({
 * });
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
import { querySelectorLive, viewportEvents } from '@blackbyte/sugar/dom';
export default function sectionClasses(settings) {
    const finalSettings = Object.assign({ inClass: '-in-viewport', offset: 25 }, settings);
    querySelectorLive('section', ($section) => {
        // listen for enter/leave viewport
        viewportEvents($section, {
            offset: finalSettings.offset,
        });
        $section.addEventListener('viewport.enter', () => {
            // add the inClass on the section
            $section.classList.add(finalSettings.inClass);
        });
        $section.addEventListener('viewport.leave', () => {
            // remove the inClass on the section
            $section.classList.remove(finalSettings.inClass);
        });
    });
}
//# sourceMappingURL=sectionClasses.js.map