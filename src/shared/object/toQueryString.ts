// @ts-nocheck

/**
 * @name                toQueryString
 * @namespace           shared.object
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Transform an object (key => pairs) to a query string like "?var1=value1&var2"
 *
 * @param 		{Object} 		obj 		The object to serialize
 * @return 		{String} 					The query string
 *
 * @todo      tests
 *
 * @snippet         toQueryString($1)
 *
 * @example 	js
 * import { toQueryString } from '@blackbyte/sugar/object'
 * console.log(toQueryString({
 * 	value1 : 'coco',
 * 	value1 : 'plop'
 * }));
 * // => ?value1=coco&value2=plop
 *
 * @changelog     1.0.0-beta.17           Added null/undefined value check
 *
 * @since       1.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function toQueryString(obj: any): string {
  return (
    '?' +
    Object.keys(obj)
      .reduce(function (a, k) {
        if (obj[k] === undefined || obj[k] === null) {
          return a;
        }
        a.push(k + '=' + encodeURIComponent(obj[k]));
        return a;
      }, [])
      .join('&')
  );
}
