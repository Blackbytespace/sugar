/**
 * @name                isDomNode
 * @namespace           js.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the passed element is a DOM node
 *
 * @param       {any}           element             The element to check
 * @return      {Boolean}                           true if is a DOM node, false if not
 *
 * @todo      tests
 *
 * @snippet         isDomNode($1)
 *
 * @example    js
 * import { isDomNode } from '@blackbyte/sugar/dom'
 * isDomNode($myElement);
 *
 * @see         https://stackoverflow.com/questions/384286/how-do-you-check-if-a-javascript-object-is-a-dom-object
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isDomNode(element) {
    return typeof Node === 'object'
        ? element instanceof Node
        : element &&
            typeof element === 'object' &&
            typeof element.nodeType === 'number' &&
            typeof element.nodeName === 'string';
}
//# sourceMappingURL=isDomNode.js.map