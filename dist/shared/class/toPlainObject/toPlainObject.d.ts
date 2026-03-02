/**
 * @name                toPlainObject
 * @namespace           shared.class
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * This function take a instance as parameter and return a plain object of it
 *
 * @param               {Mixed}               instance                Any class instance to transform into a plain object
 * @return              {Object}                                      A plain object version of the the class instance
 *
 * @todo      tests
 *
 * @snippet         toPlainObject($1)
 *
 * @example             js
 * import { toPlainObject } from '@blackbyte/sugar/class';
 * class Coco {
 *    constructor() {
 *      this.hello = 'world';
 *    }
 * }
 * toPlainObject(new Coco()); // => { hello: 'world' }
 *
 * @since       1.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function toPlainObject(theClass: any): any;
