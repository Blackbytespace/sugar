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
export type TScrollClassesSettings = {
    offset: number;
    offsetX: number;
    offsetY: number;
    class: string;
};
export default function scrollClasses(settings?: TScrollClassesSettings): void;
