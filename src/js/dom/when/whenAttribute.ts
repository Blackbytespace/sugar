import __parse from '../../../shared/string/parse.js';

/**
 * @name            whenAttribute
 * @namespace       js.dom.when
 * @type            Function
 * @platform        js
 * @status          stable
 * @async
 *
 * Resolve a promise when the wanted attribute on the passed HTMLElement exist or pass the check function provided
 *
 * @feature       Detect attribute changes
 * @feature       Possibility to pass a check function to check if the attribute suits your needs
 * @feature       Promise based API
 *
 * @param 		{HTMLElement} 				elm 				The HTMLElement on which to monitor the property
 * @param 		{String} 					attribute 			The attribute to monitor
 * @param 		{Function} 					[checkFn=null] 		An optional function to check the attribute. The promise is resolved when this function return true
 * @return 		(Promise) 										The promise that will be resolved when the attribute exist on the element (and that it passes the checkFn)
 *
 * @snippet         whenAttribute($1, $2)
 * whenAttribute($1, $2).then(value => {
 *      $3
 * });
 *
 * @todo      tests
 *
 * @example 	js
 * import { whenAttribute } from '@blackbyte/sugar/dom'
 *
 * // using promise
 * whenAttribute(myCoolHTMLElement, 'value').then(value => {
 *      // do something...
 * });
 *
 * // with a check function
 * whenAttribute(myCoolHTMLElement, 'value', {
 *    check(newVal, oldVal) {
 * 	      // make sure the value is a number
 * 		  return typeof(newVal) === 'number';
 *    }
 * }).then(value => {
 *      // do something...
 * });
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TWhenAttributeSettings = {
  check?: Function;
};

export default function whenAttribute(
  $elm: HTMLElement,
  attrName: string,
  settings?: TWhenAttributeSettings,
): Promise<any> {
  return new Promise(async (resolve) => {
    const finalSettings: TWhenAttributeSettings = {
      check: undefined,
      ...(settings ?? {}),
    };

    if ($elm.hasAttribute(attrName)) {
      const value = __parse($elm.getAttribute(attrName) ?? 'undefined');
      if (finalSettings.check && finalSettings.check(value, value)) {
        resolve(value);
        return;
      } else if (!finalSettings.check) {
        resolve(value);
        return;
      }
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName !== attrName) {
          return;
        }
        const value = __parse(
          $elm.getAttribute(mutation.attributeName) ?? 'undefined',
        );
        if (
          finalSettings.check &&
          finalSettings.check(value, mutation.oldValue)
        ) {
          resolve(value);
          observer.disconnect();
        } else if (!finalSettings.check) {
          resolve(value);
          observer.disconnect();
        }
      });
    });
    observer.observe($elm, {
      attributes: true,
    });
  });
}
