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
export type TSectionClassesSettings = {
    inClass: string;
    offset: number;
};
export default function sectionClasses(settings?: Partial<TSectionClassesSettings>): void;
