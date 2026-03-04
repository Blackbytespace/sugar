// @ts-nocheck

import type { TWhenEntersViewportSettings } from '../whenEntersViewport/whenEntersViewport.js';
import type { TWhenInteractSettings } from '../whenInteract/whenInteract.js';
import type { TWhenInViewportSettings } from '../whenInViewport/whenInViewport.js';
import type { TWhenNearViewportSettings } from '../whenNearViewport/whenNearViewport.js';
import type { TWhenOutOfViewportSettings } from '../whenOutOfViewport/whenOutOfViewport.js';
import type { TWhenVisibleSettings } from '../whenVisible/whenVisible.js';

import whenAnimationEnd from '../whenAnimationEnd/whenAnimationEnd.js';
import whenDomReady from '../whenDomReady/whenDomReady.js';
import whenEntersViewport from '../whenEntersViewport/whenEntersViewport.js';
import whenInteract from '../whenInteract/whenInteract.js';
import whenInViewport from '../whenInViewport/whenInViewport.js';
import whenNearViewport from '../whenNearViewport/whenNearViewport.js';
import whenOutOfViewport from '../whenOutOfViewport/whenOutOfViewport.js';
import whenStylesheetsReady from '../whenStylesheetsReady/whenStylesheetsReady.js';
import whenVisible from '../whenVisible/whenVisible.js';

/**
 * @name            when
 * @namespace       js.dom.when
 * @type            Function
 * @platform          js
 * @status        stable
 * @async
 *
 * This function listen for passed `trigger(s)` on the passed `HTMLElement` and resolve the promise once one of them has reached his state.
 *
 * @param       {HTMLElement}           $elm              The element to listen on
 * @param       {String|String[]}       trigger           The trigger(s) to listen on
 * @param       {TwhenSettings}         [settings={}]     Some settings like offset, etc...
 * @return      {SPromise<HTMLElement>}                   A promise resolved when all the triggers are fulfilled
 *
 * @setting         {Partial<TWhenInViewportSettings>}          [whenInViewport={}]            Some settings for the whenInViewport function
 * @setting         {Partial<TWhenNearViewportSettings>}        [whenNearViewport={}]           Some settings for the whenNearViewport function
 * @setting         {Partial<IWhenEntersViewportSettubgs>}      [whenEntersViewport={}]         Some settings for the whenEntersViewport function
 * @setting         {Partial<TWhenOutOfViewportSettings>}      [whenOutOfViewport={}]         Some settings for the whenOutOfViewport function
 * @setting         {Partial<TWhenInteractSettings>}      [whenInteract={}]         Some settings for the whenInteract function
 * @setting         {Partial<TWhenVisibleSettings>}      [whenVisible={}]         Some settings for the whenVisible function
 * @setting         {Partial<IWhenStyleSheetsReadySettings>}      [whenStylesheetsReady={}]         Some settings for the whenStylesheetsReady function
 *
 * @snippet         when($1, $2, $3)
 * when($1, $2).then(() => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example         js
 * import { when } from '@blackbyte/sugar/dom';
 * when($elm, 'inViewport', {
 *    whenInViewport: {
 *       offset: 50
 *    }
 * }).then(() => {
 *      // do something
 * });
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TwhenSettings = {
  whenInViewport?: TWhenInViewportSettings;
  whenNearViewport?: TWhenNearViewportSettings;
  whenEntersViewport?: TWhenEntersViewportSettings;
  whenOutOfViewport?: TWhenOutOfViewportSettings;
  whenInteract?: TWhenInteractSettings;
  whenVisible?: TWhenVisibleSettings;
};

export type TWhenTrigger<string> = (
  | 'direct'
  | 'directly'
  | 'inViewport'
  | 'nearViewport'
  | 'enterViewport'
  | 'outOfViewport'
  | 'interact'
  | 'visible'
  | 'domReady'
  | 'stylesheetsReady'
  | 'animationEnd'
)[];

export const WhenTriggers = [
  'direct',
  'directly',
  'inViewport',
  'nearViewport',
  'enterViewport',
  'outOfViewport',
  'interact',
  'visible',
  'stylesheetsReady',
  'domReady',
  'animationEnd',
];

export default function when(
  $elm: HTMLElement,
  trigger: TWhenTrigger[],
  settings?: TwhenSettings,
): Promise<any> {
  const finalSettings: TwhenSettings = {
    whenInViewport: {},
    whenNearViewport: {},
    whenOutOfViewport: {},
    whenInteract: {},
    whenVisible: {},
    whenStylesheetsReady: {},
    ...(settings ?? {}),
  };

  return new Promise(async (resolve, reject) => {
    // ensure we work with an array of time(s)
    if (!Array.isArray(trigger))
      trigger = trigger.split(',').map((t) => t.trim());

    const promises: Promise = [];

    // adding watchers
    trigger.forEach((t) => {
      // timeout
      const timeoutMatches = t.match(/^timeout\:([0-9]+)/);
      if (timeoutMatches && timeoutMatches[1]) {
        const timeout = parseInt(timeoutMatches[1]);
        const promise = new Promise((resolve) => {
          setTimeout(resolve, timeout);
        });
        promises.push(promise);
        return;
      }

      switch (t) {
        case 'inViewport':
          promises.push(whenInViewport($elm, finalSettings.whenInViewport));
          break;
        case 'nearViewport':
          promises.push(whenNearViewport($elm, finalSettings.whenNearViewport));
          break;
        case 'enterViewport':
          promises.push(
            whenEntersViewport($elm, finalSettings.whenEntersViewport),
          );
          break;
        case 'outOfViewport':
          promises.push(
            whenOutOfViewport($elm, finalSettings.whenOutOfViewport),
          );
          break;
        case 'interact':
          promises.push(whenInteract($elm, finalSettings.whenInteract));
          break;
        case 'visible':
          promises.push(
            whenVisible($elm, {
              ...(finalSettings.whenVisible ?? {}),
              once: true,
            }),
          );
          break;
        case 'domReady':
          promises.push(whenDomReady());
          break;
        case 'stylesheetsReady':
          promises.push(whenStylesheetsReady());
          break;
        case 'animationEnd':
          promises.push(whenAnimationEnd($elm));
          break;
      }
    });

    // if no times setted, execute directly
    if (
      !trigger.length ||
      trigger.includes('direct') ||
      trigger.includes('directly')
    ) {
      resolve($elm);
      return;
    }

    // listen for at least 1 promise resolved
    await Promise.race(promises);

    resolve($elm);
  });
}
