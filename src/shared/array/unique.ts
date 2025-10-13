import { isPlainObject } from '@blackbyte/sugar/is';

/**
 * @name                unique
 * @namespace           shared.array
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * This function simply take an array as parameter and return a new one
 * with all the duplicates values removed.
 *
 * @param         {Array}         array               The array to deduplicates
 * @return        {Array}                             The deduplicated array
 *
 * @snippet        unique($1)
 *
 * @example        js
 * import { unique } from '@blackbyte/sugar/array';
 * unique(['hello','world','hello','world']); // => ['hello','world']
 *
 * @changelog     1.0.0-beta.2
 * Add the "stringify" option to compare objects in string format
 *
 * @since         1.0.0
 * @author        Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TUniqueSettings = {
  stringify: boolean;
};

export default function unique(
  array: any[],
  settings?: Partial<TUniqueSettings>,
): any[] {
  const finalSettings: TUniqueSettings = {
    stringify: false,
    ...(settings ?? {}),
  };

  const a = array.concat();
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      let valueA = a[i],
        valueB = a[j];

      // handle "stringify" option
      if (finalSettings.stringify) {
        if (isPlainObject(valueA)) {
          valueA = JSON.stringify(valueA);
        }
        if (isPlainObject(valueB)) {
          valueB = JSON.stringify(valueB);
        }
      }

      if (valueA === valueB) {
        a.splice(j--, 1);
      }
    }
  }
  return a;
}
