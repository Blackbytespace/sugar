/**
 * @name 		            hotkey
 * @namespace           js.keyboard
 * @type                Function
 * @platform            js
 * @status              stable
 *
 * This function allows you to register a hotkey on the passed element.
 * You can specify the hotkey using the following syntax:
 * - ctrl+a
 * - shift+ctrl+a
 * - a
 * This function take care of avoiding to call your callback when the active element
 * is an input, a textarea or an editable content with the "contenteditable" attribute,
 * unless:
 * - the "meta" or "ctrl" key is used in the hotkey.
 * - the pressed key is the "escape" key.
 *
 *
 * @param       {String|String[]}        key         The key(s) to listen for
 * @param       {Function}      callback    The callback to call when the hotkey is pressed
 * @param       {THotkeySettings}      [settings={}]       Some settings to configure your hotkey
 * @return      {THotkeyApi}                          An object with a cancel method that you can call to cancel the hotkey
 *
 * @setting    {HTMLElement}       [ctx=document.body]       The context in which to listen for the hotkey
 * @setting    {Boolean}           [preventDefault=true]    Specify if you want to prevent the default behavior of the hotkey
 *
 * @todo      tests
 *
 * @snippet         hotkey($1, () => {
 *      $2
 * });
 *
 * @example    js
 * import { hotkey } from '@blackbyte/sugar/keyboard'
 * const hotkeyApi = hotkey('ctrl+a', (e) => {
 *  console.log('Hotkey pressed');
 * });
 *
 * // if you want to cancel the hotkey
 * hotkeyApi.cancel();
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type THotkeySettings = {
  ctx: HTMLElement | Document;
  preventDefault: boolean;
};

export type THotkeyApi = {
  cancel: Function;
};

export default function hotkey(
  key: string | string[],
  callback: Function,
  settings?: Partial<THotkeySettings>,
): THotkeyApi {
  const finalSettings: THotkeySettings = {
    ctx: document.body,
    preventDefault: true,
    ...(settings ?? {}),
  };

  // multiple keys
  if (Array.isArray(key)) {
    const hotkeyApis = key.map((k) => {
      return hotkey(k, callback, settings);
    });
    return {
      cancel: () => {
        hotkeyApis.forEach((api) => {
          api.cancel();
        });
      },
    };
  }

  const keys = key.split('+').map((k) => {
      if (k === 'command' || k === 'cmd') {
        return 'meta';
      }
      if (k === 'escape' || k === 'esc') {
        return 'Escape';
      }
      return k;
    }),
    finalKey = keys[keys.length - 1];

  const specialKeys = ['shift', 'ctrl', 'alt', 'meta'];

  const isMultipleSpecialKeys =
    keys.filter((k) => specialKeys.includes(k)).length > 1;

  const _handler = (e) => {
    // handle the active element.
    // if it is an input, textarea, etc... and the hotkey does not
    // include the meta key, then return
    const $activeElement = document.activeElement;
    if (
      $activeElement?.tagName === 'INPUT' ||
      $activeElement?.tagName === 'TEXTAREA' ||
      $activeElement?.hasAttribute('contenteditable')
    ) {
      if (
        !keys.includes('meta') &&
        !keys.includes('ctrl') &&
        finalKey !== 'Escape'
      ) {
        return;
      }
    }

    // handle the final key
    if (e.key !== finalKey) {
      return;
    }

    // handle the other keys (ctrl, shift, etc...)
    let multipleSpecialKeys =
        [e.shiftKey, e.ctrlKey, e.altKey, e.metaKey].filter((k) => k).length >
        1,
      hasSpecialKeys = e.shiftKey || e.ctrlKey || e.altKey || e.metaKey;

    if (keys.length > 1 && !hasSpecialKeys) {
      return;
    }

    if (isMultipleSpecialKeys && !multipleSpecialKeys) {
      return;
    }
    if (
      (e.ctrlKey && !keys.includes('ctrl')) ||
      (e.metaKey && !keys.includes('meta')) ||
      (e.altKey && !keys.includes('alt')) ||
      (e.shiftKey && !keys.includes('shift'))
    ) {
      return;
    }

    // prevent default if needed
    if (finalSettings.preventDefault) {
      e.preventDefault();
    }

    // call the callback
    callback(e);
  };

  finalSettings.ctx.addEventListener('keydown', _handler);

  return {
    cancel: () => {
      finalSettings.ctx.removeEventListener('keydown', _handler);
    },
  };
}
