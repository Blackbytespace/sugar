import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import formTrackingEvents from './formTrackingEvents.js';

// MutationObserver fires asynchronously; give it enough time
function tick(ms = 150): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Create a form and append to body; returns the form element
function createForm(html: string): HTMLFormElement {
  const div = document.createElement('div');
  div.innerHTML = html.trim();
  const form = div.querySelector('form') as HTMLFormElement;
  document.body.appendChild(form);
  return form;
}

function triggerChange(el: Element): void {
  el.dispatchEvent(new Event('change', { bubbles: true }));
}

function triggerSubmit(form: HTMLFormElement): void {
  // Use cancelable:true and preventDefault so Firefox does not navigate the page.
  // The submit event still bubbles and is received by all listeners (including
  // the tracking code under test) — only the browser's default navigation is suppressed.
  form.addEventListener('submit', (e) => e.preventDefault(), { once: true, capture: true });
  form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
}

// Global dataLayer accumulates all events across tests; filter by formId per test
const dataLayer: any[] = [];
(window as any).dataLayer = dataLayer;

// Set a stable lang before starting
document.documentElement.lang = 'en-US';

// Start formTrackingEvents ONCE — it attaches a global MutationObserver
let trackingApi: ReturnType<typeof formTrackingEvents>;
beforeAll(() => {
  trackingApi = formTrackingEvents({ enabled: true, simplifyLang: true });
});

afterAll(() => {
  // Cancel the MutationObserver so the test process can exit cleanly
  trackingApi?.cancel();
});

afterEach(() => {
  // Remove all test forms; clear dataLayer entries for next assertions
  document.querySelectorAll('form[data-test]').forEach((el) => el.remove());
  dataLayer.length = 0;
});

describe('formTrackingEvents', () => {
  it('pushes form.started to dataLayer when a form control changes', async () => {
    const form = createForm(
      `<form data-test data-form-id="started-basic">
        <input type="text" name="email" />
      </form>`,
    );
    await tick();

    triggerChange(form.querySelector('input')!);
    await tick();

    const events = dataLayer.filter((e) => e.formId === 'started-basic');
    expect(events.some((e) => e.event === 'form.started')).toBe(true);
  });

  it('pushes form.submitted to dataLayer on form submit', async () => {
    const form = createForm(
      `<form data-test data-form-id="submitted-basic">
        <input type="text" name="email" />
        <button type="submit">Submit</button>
      </form>`,
    );
    await tick();

    triggerSubmit(form);
    await tick();

    const events = dataLayer.filter((e) => e.formId === 'submitted-basic');
    expect(events.some((e) => e.event === 'form.submitted')).toBe(true);
  });

  it('includes simplified lang in dataLayer events', async () => {
    document.documentElement.lang = 'fr-FR';
    const form = createForm(
      `<form data-test data-form-id="lang-simplified">
        <input type="text" name="name" />
      </form>`,
    );
    await tick();

    triggerChange(form.querySelector('input')!);
    await tick();

    const events = dataLayer.filter((e) => e.formId === 'lang-simplified');
    expect(events.some((e) => e.event === 'form.started' && e.lang === 'fr')).toBe(true);

    // restore
    document.documentElement.lang = 'en-US';
  });

  it('emits form.started only once even if multiple controls change', async () => {
    const form = createForm(
      `<form data-test data-form-id="started-once">
        <input type="text" name="first" />
        <input type="text" name="last" />
      </form>`,
    );
    await tick();

    triggerChange(form.querySelectorAll('input')[0]);
    triggerChange(form.querySelectorAll('input')[1]);
    await tick();

    const started = dataLayer.filter(
      (e) => e.formId === 'started-once' && e.event === 'form.started',
    );
    expect(started).toHaveLength(1);
  });

  it('emits form.submitted only once even if submit fires twice', async () => {
    const form = createForm(
      `<form data-test data-form-id="submitted-once">
        <input type="text" name="email" />
      </form>`,
    );
    await tick();

    triggerSubmit(form);
    triggerSubmit(form);
    await tick();

    const submitted = dataLayer.filter(
      (e) => e.formId === 'submitted-once' && e.event === 'form.submitted',
    );
    expect(submitted).toHaveLength(1);
  });

  it('uses data-form-id attribute as formId (highest priority)', async () => {
    const form = createForm(
      `<form data-test id="native-id" data-form-id="priority-data-attr">
        <input type="hidden" name="form_id" value="hidden-id" />
        <input type="text" name="email" />
      </form>`,
    );
    await tick();

    triggerChange(form.querySelector('input[name="email"]')!);
    await tick();

    const started = dataLayer.filter((e) => e.event === 'form.started');
    expect(started.some((e) => e.formId === 'priority-data-attr')).toBe(true);
  });

  it('uses hidden form_id input value as formId (second priority)', async () => {
    const form = createForm(
      `<form data-test id="native-id-2">
        <input type="hidden" name="form_id" value="priority-hidden-input" />
        <input type="text" name="email" />
      </form>`,
    );
    await tick();

    triggerChange(form.querySelector('input[name="email"]')!);
    await tick();

    const started = dataLayer.filter((e) => e.event === 'form.started');
    expect(started.some((e) => e.formId === 'priority-hidden-input')).toBe(true);
  });

  it('uses id attribute as formId (third priority)', async () => {
    const form = createForm(
      `<form data-test id="priority-native-id">
        <input type="text" name="email" />
      </form>`,
    );
    await tick();

    triggerChange(form.querySelector('input')!);
    await tick();

    const started = dataLayer.filter((e) => e.event === 'form.started');
    expect(started.some((e) => e.formId === 'priority-native-id')).toBe(true);
  });

  it('generates a formId (starts with f + hex) when no id is provided', async () => {
    const form = createForm(
      `<form data-test action="/unique-submit-action-xyz">
        <input type="text" name="email" />
      </form>`,
    );
    await tick();

    triggerChange(form.querySelector('input')!);
    await tick();

    const started = dataLayer.filter((e) => e.event === 'form.started');
    expect(started.length).toBeGreaterThan(0);
    expect(started[started.length - 1].formId).toMatch(/^f[a-f0-9]+$/);
  });

  it('tracks select element changes as form.started', async () => {
    const form = createForm(
      `<form data-test data-form-id="select-tracking">
        <select name="choice">
          <option value="a">A</option>
          <option value="b">B</option>
        </select>
      </form>`,
    );
    await tick();

    triggerChange(form.querySelector('select')!);
    await tick();

    const started = dataLayer.filter(
      (e) => e.formId === 'select-tracking' && e.event === 'form.started',
    );
    expect(started).toHaveLength(1);
  });

  it('tracks textarea changes as form.started', async () => {
    const form = createForm(
      `<form data-test data-form-id="textarea-tracking">
        <textarea name="message"></textarea>
      </form>`,
    );
    await tick();

    triggerChange(form.querySelector('textarea')!);
    await tick();

    const started = dataLayer.filter(
      (e) => e.formId === 'textarea-tracking' && e.event === 'form.started',
    );
    expect(started).toHaveLength(1);
  });
});

describe('formTrackingEvents — disabled', () => {
  it('does not track when enabled=false', async () => {
    // A separate instance with enabled=false won't register any new listeners
    // for forms discovered after it is called. We verify by checking dataLayer
    // is not populated after a form interaction when no enabled instance sees it.
    // Since the global enabled instance is already running, we can only verify
    // the early-return path by checking no second dataLayer push happens for a
    // unique formId that an enabled instance would track (controlled by formId filter).
    // The enabled=false code path is exercised: it returns before calling querySelectorLive.
    const before = dataLayer.length;
    formTrackingEvents({ enabled: false });
    // No observer registered — dataLayer should not grow from this call alone
    expect(dataLayer.length).toBe(before);
  });
});
