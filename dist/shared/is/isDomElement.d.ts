/**
 * @name                isDomElement
 * @namespace           js.is
 * @type                Function
 * @platform            js
 * @plarform            node
 * @status              stable
 *
 * Check if the passed element is a DOM element
 *
 * @param       {any}           element             The element to check
 * @return      {Boolean}                           true if is a DOM element, false if not
 *
 * @todo      tests
 *
 * @snippet         isDomElement($1)
 *
 * @example    js
 * import { isDomElement } from '@blackbyte/sugar/dom'
 * isDomElement($myElement);
 *
 * @see         https://stackoverflow.com/questions/384286/how-do-you-check-if-a-javascript-object-is-a-dom-object
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isDomElement(element: any): boolean;
