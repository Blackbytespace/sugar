// @ts-nocheck

/**
 * @name                copyElement
 * @namespace           js.clipboard
 * @type                Function
 * @platform            js
 * @async
 * @status              stable
 *
 * This function allows you to copy to the clipboard the passed dom node element with his style
 *
 * @param       {HTMLElement}            $elm            The dom node element to copy to the clipboard
 *
 * @todo     tests
 *
 * @snippet         copyElement($1)
 *
 * @example         js
 * import { copyElement } from '@blackbyte/sugar/clipboard';
 * copyElement($elm);
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function copyElement($elm: HTMLElement): void {
  let range;
  let selection;

  if (document.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToElement($elm);
    range.select();
  } else if (window.getSelection) {
    selection = window.getSelection();
    range = document.createRange();
    range.selectNodeContents($elm);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  document.execCommand('copy');
  window.getSelection().removeAllRanges();
}
