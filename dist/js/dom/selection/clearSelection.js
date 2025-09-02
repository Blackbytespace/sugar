/**
 * @name                clearSelection
 * @namespace           js.dom.selection
 * @type                Function
 * @platform            js
 * @status              stable
 *
 * Clear the current selection in the DOM even in inputs, etc...
 **
 * @snippet         clearSelection()
 *
 * @todo        tests
 *
 * @example       js
 * import { clearSelection } from '@blackbyte/sugar/dom';
 * clearSelection();
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function clearSelection() {
    if (window.getSelection) {
        const sel = window.getSelection();
        if (sel === null || sel === void 0 ? void 0 : sel.empty) {
            sel.empty();
        }
        else if (sel === null || sel === void 0 ? void 0 : sel.removeAllRanges) {
            sel.removeAllRanges();
        }
    }
    else if (document.selection) {
        document.selection.empty();
    }
}
//# sourceMappingURL=clearSelection.js.map