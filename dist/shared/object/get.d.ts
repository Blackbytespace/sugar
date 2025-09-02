/**
 * @name                get
 * @namespace           shared.object
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Retreive an object value using a dotted path like "myObject.myProperty.myValue"
 *
 * @feature       Support optional property in the doted path like "something.cool?.hello.world"
 *
 * @param               {Object}                 obj                The object in which to set the value
 * @param               {String}                path                The dotted object path to get
 * @return              {Mixed}                                     The getted value or "undefined" if nothing found...
 *
 * @todo      tests
 *
 * @snippet         get($1, $2)
 *
 * @example             js
 * import { get } from '@blackbyte/sugar/object';
 * get(myObject, 'my.cool.value'); // => 'Hello world'
 *
 * @since     1.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
declare function get(obj: any, path: string | string[]): any;
export default get;
