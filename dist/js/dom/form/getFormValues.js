/**
 * @name            getFormValues
 * @namespace       js.dom.form
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * This function take a form element and return an object with all the values
 *
 * @param       {HTMLFormElement}      $form       The form element to get the values from
 * @return      {Object}                          An object with all the values
 *
 * @todo      tests
 *
 * @snippet         getFormValues($1)
 *
 * @example  	js
 * import { getFormValues } from '@blackbyte/sugar/dom'
 * const values = getFormValues(myForm);
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function getFormValues($form) {
    const formData = new FormData($form);
    return Object.fromEntries(formData);
}
//# sourceMappingURL=getFormValues.js.map