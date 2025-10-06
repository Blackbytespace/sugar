/**
 * @name            scrollProperties
 * @namespace       js.dom.feature
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * This feature allows you to automatically apply css properties on the element passed in settings depending on the scroll position.
 * The properties that are applied are:
 * - `--scroll-x`: The current scroll x position
 * - `--scroll-y`: The current scroll y position
 *
 * @param           {TScrollPropertiesSettings}          [settings={}]            The settings you want to override
 *
 * @setting         {HTMLElement}                        [$elm=document.body]     The element on which to apply the css properties
 *
 * @snippet          scrollProperties($1);
 *
 * @example         js
 * import { scrollProperties } from '@blackbyte/sugar/features';
 * scrollProperties();
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TScrollPropertiesSettings = {
  $elm: HTMLElement;
};

export default function scrollProperties(
  settings?: Partial<TScrollPropertiesSettings>,
): void {
  const finalSettings: TScrollPropertiesSettings = {
    $elm: document.body,
    ...(settings ?? {}),
  };

  window.addEventListener('scroll', () => {
    finalSettings.$elm.style.setProperty('--scroll-x', `${window.scrollX}px`);
    finalSettings.$elm.style.setProperty('--scroll-y', `${window.scrollY}px`);
  });
}
