/**
 * @name            uniqid
 * @namespace       node.string
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * Generate a unique identifier string using UUID v4. Works using the [uuid](https://www.npmjs.com/package/uuid) npm package under the hood.
 *
 * @return          {String}                A UUID v4 string (36 characters with dashes)
 *
 * @todo      tests
 *
 * @snippet         uniqid()
 *
 * @example       js
 * import { uniqid } from '@blackbyte/sugar/string';
 * console.log(uniqid()); // => "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"
 *
 * @see       https://www.npmjs.com/package/uuid
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function uniqid(): string;
