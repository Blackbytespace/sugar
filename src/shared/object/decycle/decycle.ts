import { decycle as __decycle } from 'json-cyclic';

/**
 * @name                decycle
 * @namespace           shared.object
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * This method simply remove the circular references in the passed object
 *
 * @param     {Object}      obj         The object to process
 * @return    {Object}                  The new object circular references free
 *
 * @snippet         decycle($1)
 *
 * @todo     tests
 *
 * @example     js
 * import { decycle } from '@blackbyte/sugar/object';
 * decycle({
 *    something: 'cool',
 *    with: 'circular references',
 *    //..
 * });
 *
 * @see         https://www.npmjs.com/package/json-cyclic
 * @since       1.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function decycle(obj: any): any {
  return __decycle(obj);
}
