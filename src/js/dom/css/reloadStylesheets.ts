import uniqid from '../../string/uniqid.js';

/**
 * @name            reloadStylesheets
 * @namespace       js.dom.css
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * This function just loop on each "link" tags that point to some css files
 * and reload them by adding a "queryString" with the timestamp in it
 * to prevent caching
 *
 * @param       {HTMLElement}           [$root=document]            The root element in which to reload the stylesheets
 *
 * @snippet         reloadStylesheets()
 *
 * @example         js
 * import { __reloeadStylesheets } from '@blackbyte/sugar/dom';
 * reloadStylesheets();
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TReloadStylesheetsSettings = {
  $root: HTMLElement | Document;
};

export default function reloadStylesheets(
  settings?: Partial<TReloadStylesheetsSettings>,
): void {
  const finalSettings: TReloadStylesheetsSettings = {
    $root: document,
    ...(settings ?? {}),
  };
  // loop on all stylesheetgs link and add the timestamp in
  Array.from(
    finalSettings.$root.querySelectorAll('link[rel=stylesheet]') ?? [],
  ).forEach(($link) => {
    const id = $link.id ?? uniqid();

    // clone the link element
    const $newLink = <HTMLLinkElement>$link.cloneNode();
    $newLink.href = (<HTMLLinkElement>$link).href.replace(
      /\?.*|$/,
      '?' + Date.now(),
    );
    // listen when fully loaded
    $newLink.addEventListener('load', (e) => {
      // remove old css's
      Array.from(
        finalSettings.$root.querySelectorAll(`link[id="${id}"]`) ?? [],
      ).forEach(($remove) => {
        if ($remove === $newLink) return;
        $remove.remove();
      });
    });
    // add the new link after the one to reload
    $link.after($newLink);
  });
}
