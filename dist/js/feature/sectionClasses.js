/**
 * @name            sectionClasses
 * @namespace       js.dom.feature
 * @type            Function
 * @platform        js
 * @status          stable
 *
 *
 * This feature allows you to add some classes on your sections when they are in the viewport, near the viewport, above, etc...
 * 1. `-in-viewport`: Added when the section is in the viewport
 * 2. `-from-above`: Added when the section enters the viewport from above
 * 3. `-from-below`: Added when the section enters the viewport from below
 * 4. `-above-viewport`: Added when the section is above the viewport
 * 5. `-below-viewport`: Added when the section is below the viewport
 *
 * @param           {TSectionClassesSettings}          [settings={}]           The settings you want to override
 *
 * @setting        {String}          [inClass='-in-viewport']        The class to add when the section is in the viewport
 * @setting        {Boolean}         [keepInClassWhenAbove=false]   Whether to keep the inClass when the section is above the viewport
 * @setting        {String}          [fromAboveClass='-from-above'] The class to add when the section enters the viewport from above
 * @setting        {String}          [fromBelowClass='-from-below'] The class to add when the section enters the viewport from below
 * @setting        {String}          [aboveClass='-above-viewport'] The class to add when the section is above the viewport
 * @setting        {String}          [belowClass='-below-viewport'] The class to add when
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
    const finalSettings = Object.assign({ inClass: '-in-viewport', keepInClassWhenAbove: false, fromAboveClass: '-from-above', fromBelowClass: '-from-below', aboveClass: '-above-viewport', belowClass: '-below-viewport', offset: 25, once: false }, settings);
    querySelectorLive('section', ($section) => {
        // listen for enter/leave viewport
        viewportEvents($section, {
            offset: finalSettings.offset,
            once: finalSettings.once
        });
        const enterHandler = () => {
            // add the inClass on the section
            $section.classList.add(finalSettings.inClass);
            // remove above/below classes
            $section.classList.remove(finalSettings.aboveClass);
            $section.classList.remove(finalSettings.belowClass);
            // stop if "once" setting is enabled
            if (finalSettings.once) {
                $section.removeEventListener('viewport.enter', enterHandler);
                $section.removeEventListener('viewport.leave', leaveHandler);
                $section.removeEventListener('viewport.enter.above', enterAboveHandler);
                $section.removeEventListener('viewport.enter.below', enterBelowHandler);
            }
        };
        const leaveHandler = () => {
            // remove the inClass on the section
            $section.classList.remove(finalSettings.fromAboveClass);
            $section.classList.remove(finalSettings.fromBelowClass);
        };
        const enterBelowHandler = () => {
            $section.classList.add(finalSettings.fromBelowClass);
        };
        const enterAboveHandler = () => {
            // add the inClass on the section
            $section.classList.add(finalSettings.fromAboveClass);
        };
        const leaveAboveHandler = () => {
            // if we want to keep the inClass when above
            if (!finalSettings.keepInClassWhenAbove) {
                $section.classList.remove(finalSettings.inClass);
            }
            // remove the inClass on the section
            $section.classList.add(finalSettings.aboveClass);
        };
        const leaveBelowHandler = () => {
            // remove the inClass
            $section.classList.remove(finalSettings.inClass);
            // remove the bellow class
            $section.classList.add(finalSettings.belowClass);
        };
        $section.addEventListener('viewport.enter.above', enterAboveHandler);
        $section.addEventListener('viewport.enter.below', enterBelowHandler);
        $section.addEventListener('viewport.leave.above', leaveAboveHandler);
        $section.addEventListener('viewport.leave.below', leaveBelowHandler);
        $section.addEventListener('viewport.enter', enterHandler);
        $section.addEventListener('viewport.leave', leaveHandler);
    });
}
//# sourceMappingURL=sectionClasses.js.map