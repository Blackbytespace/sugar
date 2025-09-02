/**
 * @name            autoResize
 * @namespace       js.dom.input
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Automatically resize a textarea height
 *
 * @param 		{HTMLFormElement} 		$textarea 		The textarea to auto resize
 *
 * @todo      tests
 *
 * @snippet         autoResize($1)
 *
 * @example 	js
 * import { autoResize } from '@blackbyte/sugar/dom';
 * autoResize($textarea);
 *
 * @see             https://stackoverflow.com/a/56416714
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierboss$input.com)
 */
export default function autoResize($textarea: HTMLTextAreaElement): void;
