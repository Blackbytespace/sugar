import { v4 as uuidv4 } from 'uuid';

/**
 * @name            uniqid
 * @namespace       node.string
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * Generate a uniqid string of 8 bytes. Work using the [uniqid](https://www.npmjs.com/package/uniqid) npm package under the hood.
 *
 * @return          {String}                A 8 bytes uniqid string
 *
 * @todo      tests
 *
 * @snippet         uniqid()
 *
 * @example       js
 * import { uniqid } from '@blackbyte/sugar/string';
 * console.log(uniqid()); // => 1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed
 *
 * @see       https://www.npmjs.com/package/uuid
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function uniqid(): string {
  return uuidv4();
}
