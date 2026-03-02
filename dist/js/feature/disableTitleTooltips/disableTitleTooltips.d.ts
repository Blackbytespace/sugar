/**
 * @name            disableTitleTooltips
 * @namespace       js.dom.feature
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * This function allows you to disable the ugly tooltips that displays when hover a link/image/etc... with a "title" attribute.
 * If you want to support accessibility, make use of the "aria-label" attribute instead
 *
 * @snippet          disableTitleTooltips();
 *
 * @example         js
 * import { disableTitleTooltips } from '@blackbyte/sugar/features';
 * disableTitleTooltips();
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function disableTitleTooltips(): void;
