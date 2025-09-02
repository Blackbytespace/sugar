/**
 * @name            generateIdFromForm
 * @namespace       js.dom.generate
 * @type            Function
 * @platform        js
 * @status          stable
 * @async
 *
 * This function generate a uniqid based on the form element passed using these rules:
 *
 * 1. If the form has an action attribute, this will be used to generate the uniqid.
 * 2. If not, the function will generate a uniqid based on the form attributes and named controls.
 *
 * Note that the named controlls will be sorted before generating the uniqid.
 *
 * @param           {HTMLFormElement}          $form           The form element to generate the uniqid from
 * @return          {String}            A uniqid
 *
 * @todo      tests
 *
 * @snippet         generateIdFromForm()
 *
 * @example         js
 * import { generateIdFromForm } from '@blackbyte/sugar/dom';
 * const id = generateIdFromForm($myForm); // => a md5 hash id
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function generateIdFromForm($form: HTMLFormElement): string;
