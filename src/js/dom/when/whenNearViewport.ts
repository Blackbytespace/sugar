import __closestScrollableElement from '../query/closestScrollableElement.js';

/**
 * @name            whenNearViewport
 * @namespace       js.dom.when
 * @type            Function
 * @platform        js
 * @status          stable
 * @async
 *
 * Monitor an HTMLElement to be notified when it is near (100vh before or after) the viewport, or in the viewport
 *
 * @feature       Promise based API
 * @feature       Some settings available to tweak the behavior
 *
 * @param 		{HTMLElement} 				elm 					The element to monitor
 * @param 		{Partial<TWhenNearViewportSettings>} 					[settings={}] 		Some settings to tweak the detection behavior
 * @return 		(Promise<HTMLElement>) 											The promise that will be resolved when the element is in the viewport
 *
 * @setting         {String}            [offset=`${window.innerHeight}px ${window.innerWidth}px`]           Some offset
 *
 * @snippet         whenNearViewport($1)
 * whenNearViewport($1).then(\$elm => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example 	js
 * import { whenNearViewport } from '@blackbyte/sugar/dom'
 * whenNearViewport(myCoolHTMLElement).then($elm => {
 * 		// do something with your element that has entered the viewport...
 * });
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TWhenNearViewportSettings = {
  offset: string | number | undefined;
};

export default function whenNearViewport(
  elm: HTMLElement,
  settings?: Partial<TWhenNearViewportSettings>,
): Promise<HTMLElement> {
  function getRootMargin() {
    return [
      `${Math.round(window.innerHeight * 0.5)}px`,
      `${Math.round(window.innerWidth * 0.5)}px`,
      `${Math.round(window.innerHeight * 0.5)}px`,
      `${Math.round(window.innerWidth * 0.5)}px`,
    ].join(' ');
  }

  const finalSettings: TWhenNearViewportSettings = {
    offset: undefined,
    ...settings,
  };

  let observer: IntersectionObserver, resizeTimeout: number;

  const rootMargin = finalSettings.offset
    ? `${finalSettings.offset}`
    : getRootMargin();

  let $closest = __closestScrollableElement(elm);
  if ($closest?.tagName === 'HTML') $closest = undefined;

  return new Promise(async (resolve) => {
    const options: IntersectionObserverInit = {
      root: $closest, // relative to document viewport
      rootMargin,
      threshold: 0, // visible amount of item shown in relation to root
    };

    function onChange(changes, observer) {
      changes.forEach((change) => {
        if (change.intersectionRatio > 0) {
          observer.disconnect?.();
          resolve(elm);
        }
      });
    }

    observer = new IntersectionObserver(onChange, options);
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
