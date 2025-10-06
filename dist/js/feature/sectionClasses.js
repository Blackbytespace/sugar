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
 *
 * @param           {TSectionClassesSettings}          [settings={}]           The settings you want to override
 *
 * @setting        {String}          [inClass='-in-viewport']        The class to add when the section is in the viewport
 * @setting        {Number}          [offset=25]                     The offset in px to consider the section is in the viewport
 *
 * @snippet          sectionClasses($1);
 *
 * @example         js
 * import { sectionClasses } from '@blackbyte/sugar/features';
 * sectionClasses();
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