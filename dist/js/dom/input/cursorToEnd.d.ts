/**
 * @name            cursorToEnd
 * @namespace       js.dom.input
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Place the cursor to the end of the input
 *
 * @param 		{HTMLFormElement} 		$input 		The input to process
 *
 * @todo      tests
 *
 * @snippet         cursorToEnd($1)
 *
 * @example 	js
 * import { cursorToEnd } from '@blackbyte/sugar/dom';
 * cursorToEnd($input);
 *
 * @see             https://stackoverflow.com/a/56416714
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierboss$input.com)
 */
export default function cursorToEnd($input: HTMLTextAreaElement | HTMLInputElement): void;
