// @ts-nocheck
import easeInOutQuad from '../../shared/easing/easeInOutQuad.js';
import isUserScrolling from '../is/isUserScrolling.js';

/**
 * @name                scrollTo
 * @namespace           js.dom.scroll
 * @type                Function
 * @platform            js
 * @status              beta
 * @async
 *
 * Function that let you make a smooth page scroll to a specific element in the page
 *
 * @feature       Promise based API
 * @feature       Tweak the scroll behavior like duration, easing, etc...
 *
 * @setting         {HTMLElement} 				[$elm=window] 			The element to scroll
 * @setting 		{Number} 					[duration=1000] 		The animation duration
 * @setting 		{Function} 					[easing=easeInOutQuad] 			An easing Function
 * @setting         {Number}                    [offsetX=0]             An offset to apply on the X axis
 * @setting         {Number}                    [offsetY=0]             An offset to apply on the Y axis
 * @setting 		{String} 					[align='start'] 			The destination align (start, center, end)
 * @setting 		{String} 					[justify='start'] 			The destination justify (start, center, end)
 * @setting 		{Boolean} 					[force=false] 			Force the scroll even if the user is scrolling
 * @setting 		{Function} 					[onFinish=null] 		A callback to call when the animation if finished
 *
 * @param 		{HTMLElement} 				target 			The element to scroll to
 * @param       {IScrollToSettings}     [settings={}]       Some settings to tweak the scroll behavior
 * @return      {Promise}           A promise resolved once the scroll has ended
 *
 * @snippet         __scrollTo($1)
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import { __scrollTop } from '@coffeekraken/sugar/dom'
 * import { easeInOutQuad } from '@coffeekraken/sugar/easing'
 * __scrollTo(myCoolHTMLElement);
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export interface IScrollToSettings {
  $elm: HTMLElement | typeof window | typeof document;
  duration: number;
  easing: Function;
  offsetX: number;
  offsetY: number;
  align: 'start' | 'center' | 'end';
  justify: 'start' | 'center' | 'end';
  force: boolean;
  onFinish?: Function;
}

export default function __scrollTo(
  target: HTMLElement | 'top' | 'bottom' | 'left' | 'right',
  settings: Partial<IScrollToSettings> = {},
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    const finalSettings: IScrollToSettings = {
      $elm: window,
      duration: 500,
      easing: easeInOutQuad,
      offsetX: 0,
      offsetY: 0,
      align: 'start',
      justify: 'start',
      force: false,
      ...settings,
    };

    // remap element if needed
    if (finalSettings.$elm === document.body) finalSettings.$elm = window;
    if (finalSettings.$elm === document) finalSettings.$elm = window;
    if (finalSettings.$elm === document.querySelector('html'))
      finalSettings.$elm = window;

    const $scrollElm =
      finalSettings.$elm === window ? document.body : finalSettings.$elm;

    let elmHeight =
      finalSettings.$elm === window
        ? window.innerHeight
        : finalSettings.$elm.offsetHeight;
    let elmWidth =
      finalSettings.$elm === window
        ? window.innerWidth
        : finalSettings.$elm.offsetWidth;

    let elmTop =
      finalSettings.$elm === window
        ? 0
        : finalSettings.$elm?.getBoundingClientRect().top;
    let elmLeft =
      finalSettings.$elm === window
        ? 0
        : finalSettings.$elm?.getBoundingClientRect().left;

    let maxScrollY = $scrollElm.scrollHeight - elmHeight;
    let maxScrollX = $scrollElm.scrollWidth - elmWidth;

    const currentY =
      finalSettings.$elm === window
        ? window.pageYOffset
        : finalSettings.$elm?.scrollTop;
    const currentX =
      finalSettings.$elm === window
        ? window.pageXOffset
        : finalSettings.$elm?.scrollLeft;

    // handle paddings
    if (finalSettings.$elm !== window) {
      const computedScrollStyles = window.getComputedStyle(finalSettings.$elm);
      maxScrollY += parseInt(computedScrollStyles.paddingTop);
      maxScrollY += parseInt(computedScrollStyles.paddingBottom);
      maxScrollX += parseInt(computedScrollStyles.paddingLeft);
      maxScrollX += parseInt(computedScrollStyles.paddingRight);
    }

    let targetY = currentY,
      targetX = currentX;
    let targetBounds;
    try {
      if (window.getComputedStyle(target).display === 'none') {
        target.style.display = 'block';
      }
      targetBounds = target.getBoundingClientRect();
      target.style.display = null;
    } catch (e) {
      targetBounds = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      };
    }

    const offsetY = finalSettings.offsetY ?? 0;
    const offsetX = finalSettings.offsetX ?? 0;

    if (target === 'top') {
      targetY = 0;
    } else if (target === 'bottom') {
      targetY =
        finalSettings.$elm?.scrollHeight ??
        document.documentElement.scrollHeight;
    }

    if (target === 'left') {
      targetX = 0;
    } else if (target === 'right') {
      targetY =
        finalSettings.$elm?.scrollWidth ?? document.documentElement.scrollWidth;
    }

    // y
    if (finalSettings.align === 'center') {
      targetY += targetBounds.top + targetBounds.height / 2;
      targetY -= elmHeight / 2;
      targetY -= offsetY;
    } else if (finalSettings.align === 'end') {
      targetY += targetBounds.bottom;
      targetY -= elmHeight;
      targetY += offsetY;
    } else {
      // start, undefined
      targetY += targetBounds.top;
      targetY -= offsetY;
    }

    targetY = Math.max(Math.min(maxScrollY, targetY), 0);
    const deltaY = targetY - currentY - elmTop;

    // x
    if (finalSettings.justify === 'center') {
      targetX += targetBounds.left + targetBounds.width / 2;
      targetX -= elmWidth / 2;
      targetX -= offsetX;
    } else if (finalSettings.justify === 'end') {
      targetX += targetBounds.right;
      targetX -= elmWidth;
      targetX += offsetX;
    } else {
      // start, undefined
      targetX += targetBounds.left;
      targetX -= offsetX;
    }
    targetX = Math.max(Math.min(maxScrollX, targetX), 0);
    const deltaX = targetX - currentX - elmLeft;

    // element position
    if (finalSettings.$elm?.getBoundingClientRect) {
      const elmBounds = finalSettings.$elm.getBoundingClientRect();
      targetY -= elmBounds.top;
      targetX -= elmBounds.left;
    }

    const obj = {
      targetY,
      targetX,
      deltaY,
      deltaX,
      currentY,
      currentX,
      duration: finalSettings.duration,
      easing: finalSettings.easing,
      force: finalSettings.force,
      $elm: finalSettings.$elm,
      onFinish() {
        finalSettings.onFinish && finalSettings.onFinish();
        resolve();
      },
      startTime: Date.now(),
      step: __scrollTo.step,
    };
  });
}

__scrollTo.step = function () {
  // Calculate how much time has passed
  const t = Math.min((Date.now() - this.startTime) / this.duration, 1);

  let $scrollElm = this.$elm;
  if (this.$elm === document.body || this.$elm === document) {
    $scrollElm = window;
  }

  // Scroll window amount determined by easing
  const x = this.targetX - (1 - this.easing(t)) * this.deltaX;
  const y = this.targetY - (1 - this.easing(t)) * this.deltaY;

  $scrollElm.scrollTo(x, y);

  if (!this.force && isUserScrolling(this.$elm)) return;

  // Continue animation as long as duration hasn't surpassed
  if (t !== 1) {
  } else {
    if (this.onFinish) this.onFinish();
  }
};
