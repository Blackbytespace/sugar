/**
 * @name            iframeAutoSize
 * @namespace       js.dom.iframe
 * @type            Function
 * @platform        js
 * @status          stable
 * @async
 *
 * This function allows you to resize an iframe to fit its content.
 *
 * @param           {HTMLElement}           obj           The iframe element to resize
 * @param           {TIFrameAutoSizeSettings}           [settings={}]           Some settings to configure your iframe auto size
 *
 * @setting        {Boolean}         [width=true]         Specify if you want to resize the width of the iframe
 * @setting        {Boolean}         [height=true]        Specify if you want to resize the height of the iframe
 *
 * @snippet         iframeAutoSize($1)
 * iframeAutoSize($1, $2);
 *
 * @todo      tests
 *
 * @example  	js
 * import { iframeAutoSize } from '@blackbyte/sugar/dom';
 * iframeAutoSize($1, $2);
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TIFrameAutoSizeSettings = {
  width?: boolean;
  height?: boolean;
};

export default function iframeAutoSize(
  $iframe: HTMLIFrameElement,
  settings?: TIFrameAutoSizeSettings,
): void {
  const finalSettings: TIFrameAutoSizeSettings = {
    width: true,
    height: true,
    ...settings,
  };

  function _resize(): void {
    if (finalSettings.width) {
      $iframe.style.width = 0 + 'px';
      $iframe.style.width =
        $iframe.contentWindow?.document.documentElement.scrollWidth + 'px';
      setTimeout(() => {
        if ($iframe.contentWindow?.document.body.scrollWidth) {
          _resize();
        }
      }, 100);
    }
    if (finalSettings.height) {
      $iframe.style.height = 0 + 'px';
      $iframe.style.height =
        $iframe.contentWindow?.document.documentElement.scrollHeight + 'px';
      setTimeout(() => {
        if ($iframe.contentWindow?.document.body.scrollHeight) {
          _resize();
        }
      }, 100);
    }
  }

  $iframe.addEventListener('load', () => {
    // resize on load
    _resize;

    // resize on image load
    $iframe.contentWindow?.document.body
      .querySelectorAll('img')
      .forEach(($img) => {
        $img.addEventListener('load', () => {
          _resize();
        });
      });

    // observe for changes in the iframe content
    const observer = new MutationObserver((mutations) => {
      setTimeout(() => {
        _resize();
      });
    });
    observer.observe($iframe.contentWindow?.document.body as HTMLElement, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  });
  $iframe.contentWindow?.addEventListener('resize', _resize);
}
