import {
  distanceFromElementTopToViewportTop,
  whenRemoved,
} from '../_exports.js';

/**
 * @name            viewportEvents
 * @namespace       js.dom.event
 * @type            Function
 * @platform        js
 * @status          stable
 * @async
 *
 * Monitor when the passed element enter or exit the viewport
 *
 * @param 		  {HTMLElement} 						$elm  		                        The element to monitor
 * @param       {Partial<TViewportEventsSettings>}      [$settings={}]      Some settings to configure your detector
 * @return 		  {Function} 		                                          The passed HTMLElement
 *
 * @setting         {String}        [offset=25]                 An offset to detect the enter/leave earlier or later
 * @setting         {Boolean}       [once=false]                Specify if you want to event to be dispatched only once
 *
 * @event       viewport.enter               Dispatched when the passed element enter the viewport
 * @event       viewport.leave               Dispatched when the passed element leave the viewport
 * @event       viewport.enter.above         Dispatched when the passed element enter the viewport from above
 * @event       viewport.enter.below         Dispatched when the passed element enter the viewport from below
 * @event       viewport.leave.above         Dispatched when the passed element leave the viewport from above
 * @event       viewport.leave.below         Dispatched when the passed element leave the viewport from below
 *
 * @snippet         viewportEvents($1)
 * viewportEvents($1).addEventListener('viewport.enter', (e) => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example  	js
 * import { viewportEvents } from '@blackbyte/sugar/dom';
 * viewportEvents($elm);
 * $elm.addEventListener('viewport.enter', (e) => {
 *   // do something on enter
 * });
 * $elm.addEventListener('viewport.leave', (e) => {
 *   // do something on leave
 * });
 *
 * @changelog       1.0.0
 * Rename events from `viewport.in` / `viewport.out` to `viewport.enter` / `viewport.leave`
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TViewportEventsSettings = {
  offset: number | string;
  once: boolean;
};

export type TViewportEventsApi = {
  $elm: HTMLElement;
  cancel: () => void;
};

const _viewportEventsInited = new WeakMap();

export default function viewportEvents(
  $elm: HTMLElement,
  settings?: Partial<TViewportEventsSettings>,
): TViewportEventsApi {
  let observer,
    status = 'out';

  if (_viewportEventsInited.has($elm)) {
    return {
      $elm,
      cancel: () => {},
    };
  }
  _viewportEventsInited.set($elm, true);

  const finalSettings: TViewportEventsSettings = {
    offset: 25,
    once: false,
    ...(settings ?? {}),
  };

  observer = new IntersectionObserver(
    (entries, observer) => {
      if (!entries.length) return;

      const entry = entries.pop();
      if (!entry) return;
      if (entry.intersectionRatio > 0) {
        if (status === 'in') {
          return;
        }

        const distanceToTop = distanceFromElementTopToViewportTop($elm);
        if (distanceToTop < window.innerHeight * 0.5) {
          $elm.dispatchEvent(
            new CustomEvent('viewport.enter.above', {
              bubbles: true,
            }),
          );
        } else {
          $elm.dispatchEvent(
            new CustomEvent('viewport.enter.below', {
              bubbles: true,
            }),
          );
        }

        status = 'in';
        $elm.dispatchEvent(
          new CustomEvent('viewport.enter', {
            bubbles: true,
          }),
        );
        $elm.dispatchEvent(
          new CustomEvent('viewport.in', {
            bubbles: true,
          }),
        );
        if (finalSettings?.once) {
          observer.disconnect();
        }
      } else {
        if (status === 'out') {
          return;
        }

        const distanceToTop = distanceFromElementTopToViewportTop($elm);
        if (distanceToTop < window.innerHeight * 0.5) {
          $elm.dispatchEvent(
            new CustomEvent('viewport.leave.above', {
              bubbles: true,
            }),
          );
        } else {
          $elm.dispatchEvent(
            new CustomEvent('viewport.leave.below', {
              bubbles: true,
            }),
          );
        }

        status = 'out';
        $elm.dispatchEvent(
          new CustomEvent('viewport.leave', {
            bubbles: true,
          }),
        );
        $elm.dispatchEvent(
          new CustomEvent('viewport.out', {
            bubbles: true,
          }),
        );
      }
    },
    {
      root: null, // viewport
      rootMargin:
        typeof finalSettings.offset === 'string'
          ? finalSettings.offset
          : `${finalSettings.offset}px`,
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    },
  );

  observer.observe($elm);

  // clean up on remove
  whenRemoved($elm).then(() => {
    observer.disconnect();
  });

  return {
    $elm,
    cancel: () => {
      observer.disconnect();
    },
  };
}
