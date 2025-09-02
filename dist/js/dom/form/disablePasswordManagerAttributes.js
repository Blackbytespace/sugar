/**
 * @name            disablePasswordManagerAttributes
 * @namespace       js.dom.form
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * This function return an object of attributes to apply on a form element to disable the password manager autocomplete feature.
 * It support these password managers:
 * - 1Password
 * - LastPass
 * - Bitwarden
 * - Dashlane
 * - Browser's built-in password manager
 *
 * @return      {Object}                          An object of attributes to apply on a form element to disable the password manager autocomplete feature.
 *
 * @todo      tests
 *
 * @snippet         disablePasswordManagerAttributes()
 *
 * @example  	js
 * import { disablePasswordManagerAttributes } from '@blackbyte/sugar/dom'
 * const attrs = disablePasswordManagerAttributes();
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function disablePasswordManagerAttributes() {
    return {
        'data-1p-ignore': true,
        'data-lpignore': true,
        'data-form-type': 'other',
        'data-bwignore': true,
    };
}
//# sourceMappingURL=disablePasswordManagerAttributes.js.map