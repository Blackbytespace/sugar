/**
 * @name            whenOutOfViewport
 * @namespace       js.dom.when
 * @type            Function
 * @platform        js
 * @status          stable
 * @async
 *
 * Monitor an HTMLElement to be notified when it exit the viewport
 *
 * @feature       Promise based API
 * @feature       Some settings to tweak the detection behavior
 *
 * @param 		{HTMLElement} 				$elm 				The element to monitor
 * @param 		{Partial<TWhenOutOfViewportSettings>} 					[settings={}]       Some settings to tweak the detection behavior
 * @return 		(Promise<HTMLElement>) 										The promise that will be resolved when the element exit the viewport
 *
 * @setting       {String}      [offset=10px]     An offset to detect sooner or later the element exits the viewport
 *
 * @snippet         whenOutOfViewport($1)
 * whenOutOfViewport($1).then(\$$elm => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example 	js
 * import { whenOutOfViewport } from '@blackbyte/sugar/dom'
 * whenOutOfViewport(myCoolHTMLElement).then(($elm) => {
 * 		// do something with your element that has exit the viewport...
 * });
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TWhenOutOfViewportSettings = {
  offset: string | number;
};

export default function whenOutOfViewport(
  $elm: HTMLElement,
  settings: Partial<TWhenOutOfViewportSettings> = {},
) {
  return new Promise((resolve, reject) => {
    settings = {
      offset: '10px',
      ...settings,
    };

    let isInViewport = false;
    const _cb = () => {
      if (!isInViewport) {
        observer.disconnect();
        resolve($elm);
      }
    };

    const observer = new IntersectionObserver(
      (entries, observer) => {
        if (!entries.length) return;
        const entry = entries[0];
        if (entry.intersectionRatio > 0) {
          isInViewport = true;
        } else {
          isInViewport = false;
        }
        _cb();
      },
      {
        root: null, // viewport
        rootMargin: `${settings.offset}`,
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      },
    );

    observer.observe($elm);
  });
}
