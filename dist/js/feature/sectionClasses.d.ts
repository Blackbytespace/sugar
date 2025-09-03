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
export type TSectionClassesSettings = {
    inClass: string;
    offset: number;
};
export default function sectionClasses(settings?: Partial<TSectionClassesSettings>): void;
