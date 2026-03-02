/**
 * @name            formTrackingEvents
 * @namespace       js.tracking
 * @type            Function
 * @platform        js
 * @status          stable
 * @async
 *
 * This function allows you to automatically track some events on your forms like the start of the form filling,
 * the form submission, etc...
 * Each event has as data the form id "formId" and the language of the page "lang".
 * Here's the events dispatched thgouth the dataLayer:
 *
 * - `form.started`: When the form has been started to be filled
 * - `form.submitted`: When the form has been submitted
 *
 * Some data are automatically added to the dataLayer like the form id (`formId`) and the language (`lang`) of the page.
 *
 * The form id is getter/generated using these rules:
 *
 * 1. If a `data-form-id` attribute is present on the form, this will be used as the form id
 * 2. If an input named `form_id` is present in the form, it's value will be used as the form id
 * 3. If an `id` attribute is present on the form, this will be used as the form id
 * 4. If nothing is found, a form id is generated using the `generateIdFromForm` function
 *
 * @param        {TFormTrackingEventsSettings}       [settings={}]         Some settings to configure your form tracking events
 *
 * @setting           {Boolean}         [lang=true]               Specify if you want to emit the language specific events
 * @setting           {Boolean}         [debug=false]             Specify if you want to log some debug informations
 * @setting           {Boolean}         [simplifyLang=true]       Specify if you want to simplify the lang attribute to only the first part like `en` instead of `en-US`
 *
 * @todo      tests
 *
 * @snippet         formTrackingEvents($1)
 *
 * @example         js
 * import { formTrackingEvents } from '@blackbyte/sugar/tracking';
 * formTrackingEvents();
 *
 * // Each dispatched events are like:
 * {
 *    event: 'form.started',
 *    formId: 'my-form-id',
 *    lang: 'en'
 * }
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TFormTrackingEventsSettings = {
    lang?: boolean;
    simplifyLang?: boolean;
    debug?: boolean;
    enabled?: boolean;
};
export default function formTrackingEvents(settings?: Partial<TFormTrackingEventsSettings>): void;
