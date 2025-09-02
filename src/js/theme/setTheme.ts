import { setCookie } from '@blackbyte/sugar/cookie';

/**
 * @name            setTheme
 * @namespace       js.theme
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * This function allows you to set a theme for your website/application.
 * It will set the theme on the `body` tag like `theme-...` and set a cookie to remember the theme.
 * You will be able to get the theme from your backend code (PHP) using the `\Sugar\Theme\getTheme()` function
 * to set it in your body class attribute.
 *
 * @param           {String}           theme           The theme name to set
 * @param          {TSetThemeSettings}          [settings={}]         Some settings to configure your theme setter
 *
 * @setting         {String}          [cookieName='theme']         The cookie name to use to store the theme
 *
 * @todo      tests
 *
 * @snippet         setTheme($1)
 *
 * @example         js
 * import { setTheme } from '@blackbyte/sugar/theme';
 * setTheme('dark');
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TSetThemeSettings = {
  cookieName: string;
};

export default function setTheme(
  theme: string,
  settings?: TSetThemeSettings,
): void {
  const finalSettings: TSetThemeSettings = {
    cookieName: 'theme',
    ...(settings ?? {}),
  };

  document.body.classList.forEach((cls) => {
    if (cls.match(/^theme-/)) {
      document.body.classList.remove(cls);
    }
  });
  document.body.classList.add(`theme-${theme}`);

  setCookie(finalSettings.cookieName, theme);
}
