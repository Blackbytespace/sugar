/**
 * @name                    cyclic
 * @namespace               shared.is
 * @type                    Function
 * @platform                js
 * @platform                node
 * @status                  stable
 *
 * This function check if the passed object has circular dependencies and if so, returns where it has been found in the object
 *
 * @param           {Object}            object              The object to check
 * @return          {String|false}                              false if all is ok, a string that tells where the circular dep has been found if not
 *
 * @todo      tests
 *
 * @snippet         isCyclic($1)
 *
 * @example           js
 * import { isCyclic } from '@blackbyte/sugar/is';
 * const obj = { hello: 'world' };
 * obj.cyclic = obj;
 * isCyclic(obj);
 *
 * @see            https://stackoverflow.com/questions/14962018/detecting-and-fixing-circular-references-in-javascript
 * @since       1.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isCyclic(obj: any): boolean;
