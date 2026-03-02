import { v4 as uuidv4 } from 'uuid';

/**
 * @name            uniqid
 * @namespace       js.string
 * @type            Function
 * @platform        js
 * @status          stable
 * @async
 *
 * This function simply returns you a unique id
 *
 * @return          {String}            A uniqid
 *
 * @todo      tests
 *
 * @snippet         uniqid()
 *
 * @example         js
 * import { uniqid } from '@blackbyte/sugar/string';
 * const id = uniqid();
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default uuidv4;
