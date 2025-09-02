import isInViewport from '../../is/isInViewport.js';

/**
 * @name                whenEntersViewport
 * @namespace           js.dom.when
 * @type                Function
 * @platform            js
 * @status              stable
 * @async
 *
 * Monitor an HTMLElement to be notified when it is enters in the viewport (1/3vh in the viewport), or in the viewport
 *
 * @feature       Promise based API
 * @feature       Some settings available to tweak the behavior
 *
 * @param 		{HTMLElement} 				elm 					The element to monitor
 * @param 		{Partial<TWhenEntersViewportSettings>} 					[settings={}] 		Some settings to tweak the detection behavior
 * @return 		(Promise<HTMLElement>) 											The promise that will be resolved when the element is in the viewport
 *
 * @setting         {String}        [offset='0px 0px -25% 0px']         An offset to detect the element entering in viewport earlier or later
 *
 * @snippet         whenEntersViewport($1)
 * whenEntersViewport($1).then(\$elm => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example 	js
 * import { whenEntersViewport } from '@blackbyte/sugar/dom'
 * whenEntersViewport($myElement).then(($elm) => {
 * 		// do something with your element that has entered the viewport...
 * });
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TWhenEntersViewportSettings = {
  offset: string | number | undefined;
};

export default function whenEntersViewport(
  elm: HTMLElement,
  settings?: TWhenEntersViewportSettings,
): Promise<HTMLElement> {
  function getRootMargin(): string {
    return [
      `${Math.round(window.innerHeight * 0.15 * -1)}px`,
      `${Math.round(window.innerWidth * 0.15 * -1)}px`,
      `${Math.round(window.innerHeight * 0.15 * -1)}px`,
      `${Math.round(window.innerWidth * 0.15 * -1)}px`,
    ].join(' ');
  }

  const finalSettings: TWhenEntersViewportSettings = {
    offset: undefined,
    ...settings,
  };

  let resizeTimeout: number;

  const rootMargin = finalSettings.offset
    ? `${finalSettings.offset}`
    : getRootMargin();

  return new Promise(async (resolve) => {
    const options: IntersectionObserverInit = {
      root: null, // relative to document viewport
      rootMargin, // margin around root. Values are similar to css property. Unitless values not allowed
      threshold: 0, // visible amount of item shown in relation to root
    };

    if (isInViewport(elm)) {
      return resolve(elm);
    }

    function onChange(changes, observer) {
      changes.forEach((change) => {
        if (change.intersectionRatio > 0) {
          observer.disconnect?.();
          resolve(elm);
        }
      });
    }

    let observer = new IntersectionObserver(onChange, options);
    observer.observe(elm);

    window.addEventListener('resize', (e) => {
      clearTimeout(resizeTimeout);
      // @ts-ignore
      resizeTimeout = setTimeout(() => {
        observer.disconnect?.();
        options.rootMargin = rootMargin;
        observer = new IntersectionObserver(onChange, options);
        observer.observe(elm);
      }, 500);
    });
  });
}
