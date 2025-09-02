import { parseHtml } from '@blackbyte/sugar/console';
import { generateIdFromForm, querySelectorLive } from '@blackbyte/sugar/dom';

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

function _getFormId($form) {
  // get from the form dataset
  if ($form.dataset.formId) {
    return $form.dataset.formId;
  }

  // [form_id] is a hidden input field that contains the form id
  const $formIdControl = $form.querySelector("[name='form_id']");
  if ($formIdControl) {
    return $formIdControl.value;
  }

  // id from form directly
  if ($form.id) {
    return $form.id;
  }

  // generate form id
  const formId = generateIdFromForm($form);

  // apply the form id on the form
  $form.setAttribute('data-form-id', formId);

  // return the newsly created form id
  return formId;
}

export default function formTrackingEvents(
  settings?: Partial<TFormTrackingEventsSettings>,
): void {
  const finalSettings: TFormTrackingEventsSettings = {
    lang: true,
    debug: false,
    simplifyLang: true,
    enabled: true,
    ...(settings || {}),
  };

  // if disabled, stop here
  if (!finalSettings.enabled) {
    return;
  }

  // @ts-ignore
  const dataLayer = window.dataLayer || [];

  const _log = (msg: string) => {
    if (!finalSettings.debug) return;
    console.info(parseHtml(`[FormTrackingEvents]: ${msg}`));
  };

  // get each forms in the page
  querySelectorLive('form', ($form) => {
    // get the form id
    const formId = _getFormId($form);

    // get the language of the page
    let lang = document.documentElement.lang?.toLowerCase();
    if (finalSettings.simplifyLang) {
      lang = lang.split('-')[0];
    }

    // util log for SEO
    _log(`<magenta>${formId}</magenta> discovered`);

    // add event listener to the form
    // to track the form submission
    $form.addEventListener('submit', function () {
      if (($form as HTMLFormElement).checkValidity() === false) {
        return;
      }
      if ($form.hasAttribute('submitted')) {
        return;
      }
      $form.setAttribute('submitted', 'true');
      dataLayer?.push({ event: `form.submitted`, formId, lang });
      _log(
        `<yellow>form.submitted</yellow> emitted for form <magenta>${formId}</magenta> in lang <cyan>${
          lang ?? 'unknown'
        }</cyan>`,
      );
    });

    // check the form controls to track the form start
    const $formControls = $form.querySelectorAll('input, select, textarea');

    // handle form start
    function handleFormStart() {
      if ($form.hasAttribute('started')) {
        return;
      }
      $form.setAttribute('started', 'true');
      dataLayer?.push({ event: `form.started`, formId, lang });
      _log(
        `[Form]: <cyan>form.started</cyan> emitted for form <magenta>${formId}</magenta> in lang <cyan>${
          lang ?? 'unknown'
        }</cyan>`,
      );
    }

    for (let [i, $formControl] of $formControls.entries()) {
      $formControl.addEventListener('keypress', handleFormStart);
      $formControl.addEventListener('change', handleFormStart);
    }
  });
}
