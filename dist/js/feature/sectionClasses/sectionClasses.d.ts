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
export type TSectionClassesSettings = {
    inClass: string;
    keepInClassWhenAbove: boolean;
    fromAboveClass: string;
    fromBelowClass: string;
    aboveClass: string;
    belowClass: string;
    offset: number;
    once?: boolean;
};
export default function sectionClasses(settings?: Partial<TSectionClassesSettings>): void;
