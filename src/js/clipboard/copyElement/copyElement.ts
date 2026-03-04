/**
 * @name                copyElement
 * @namespace           js.clipboard
 * @type                Function
 * @platform            js
 * @status              stable
 *
 * This function allows you to copy to the clipboard the passed dom node element with his style
 *
 * @param       {HTMLElement}            $elm            The dom node element to copy to the clipboard
 *
 * @snippet         copyElement($1)
 *
 * @example         js
 * import { copyElement } from '@blackbyte/sugar/clipboard';
 * copyElement($elm);
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function copyElement($elm: HTMLElement): void {
  const selection = window.getSelection();
  if (!selection) return;

  const range = document.createRange();
  range.selectNodeContents($elm);
  selection.removeAllRanges();
  selection.addRange(range);

  // execCommand is deprecated but remains the only synchronous way to copy
  // rich HTML content to the clipboard across all browsers.
  document.execCommand('copy');

  selection.removeAllRanges();
}
