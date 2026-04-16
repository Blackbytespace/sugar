import { querySelectorUp } from '@blackbyte/sugar/dom';

/**
 * @name            isDarkMode
 * @namespace       js.is
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Detect if the user prefer the dark mode.
 * Dark mode is detected using:
 * - Match the media query `prefers-color-scheme: dark`
 * - Check if an element has the class `-dark` on it or any of its parents (up to the document root)
 *
 * @return    {Boolean}    true if prefer dark mode, false if not
 *
 * @setting         {Window}       [ctx=window]               The window context to use
 * @setting         {HTMLElement}  [rootNode]                 An optional root node to check for the `-dark` class
 *
 * @todo      tests
 *
 * @snippet         isDarkMode()
 *
 * @example 	js
 * import { isDarkMode } from '@blackbyte/sugar/is'
 * if (isDarkMode()) {
 *   // do something cool
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TIsDarkModeSettings = {
  ctx: Window;
  rootNode?: HTMLElement;
};

export default function isDarkMode(
  settings?: Partial<TIsDarkModeSettings>,
): boolean {
  const finalSettings: TIsDarkModeSettings = {
    ctx: window,
    ...(settings ?? {}),
  };

  if (finalSettings.rootNode) {
    if (finalSettings.rootNode.classList.contains('-dark')) {
      return true;
    }
    const $dark = querySelectorUp(finalSettings.rootNode, '.-dark');
    if ($dark) {
      return true;
    }
    return false;
  }

  return (
    finalSettings.ctx.matchMedia &&
    finalSettings.ctx.matchMedia('(prefers-color-scheme: dark)').matches
  );
}
