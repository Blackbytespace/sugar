import { parseHtml } from '@blackbyte/sugar/console';
import { generateIdFromForm, querySelectorLive } from '@blackbyte/sugar/dom';
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
export default function formTrackingEvents(settings) {
    const finalSettings = Object.assign({ lang: true, debug: false, simplifyLang: true, enabled: true }, (settings || {}));
    // if disabled, stop here
    if (!finalSettings.enabled) {
        return;
    }
    // @ts-ignore
    const dataLayer = window.dataLayer || [];
    const _log = (msg) => {
        if (!finalSettings.debug)
            return;
        console.info(parseHtml(`[FormTrackingEvents]: ${msg}`));
    };
    // get each forms in the page
    querySelectorLive('form', ($form) => {
        var _a;
        // get the form id
        const formId = _getFormId($form);
        // get the language of the page
        let lang = (_a = document.documentElement.lang) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        if (finalSettings.simplifyLang) {
            lang = lang.split('-')[0];
        }
        // util log for SEO
        _log(`<magenta>${formId}</magenta> discovered`);
        // add event listener to the form
        // to track the form submission
        $form.addEventListener('submit', function () {
            if ($form.checkValidity() === false) {
                return;
            }
            if ($form.hasAttribute('submitted')) {
                return;
            }
            $form.setAttribute('submitted', 'true');
            dataLayer === null || dataLayer === void 0 ? void 0 : dataLayer.push({ event: `form.submitted`, formId, lang });
            _log(`<yellow>form.submitted</yellow> emitted for form <magenta>${formId}</magenta> in lang <cyan>${lang !== null && lang !== void 0 ? lang : 'unknown'}</cyan>`);
        });
        // check the form controls to track the form start
        const $formControls = $form.querySelectorAll('input, select, textarea');
        // handle form start
        function handleFormStart() {
            if ($form.hasAttribute('started')) {
                return;
            }
            $form.setAttribute('started', 'true');
            dataLayer === null || dataLayer === void 0 ? void 0 : dataLayer.push({ event: `form.started`, formId, lang });
            _log(`[Form]: <cyan>form.started</cyan> emitted for form <magenta>${formId}</magenta> in lang <cyan>${lang !== null && lang !== void 0 ? lang : 'unknown'}</cyan>`);
        }
        for (let [i, $formControl] of $formControls.entries()) {
            $formControl.addEventListener('keypress', handleFormStart);
            $formControl.addEventListener('change', handleFormStart);
        }
    });
}
//# sourceMappingURL=formTrackingEvents.js.map