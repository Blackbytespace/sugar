/**
 * @name            isCommandExists
 * @namespace       node.is
 * @type            Function
 * @async
 * @platform        node
 * @status          stable
 *
 * This function allows you to check if a command exists on the system where the script is running
 *
 * @todo        tests
 *
 * @param       {String}            command         The command to check like "ls", "node", etc...
 * @return      {Promise}                           A promise fullfiled once the check has finished with true of false as value
 *
 * @snippet         isCommandExists($1)
 * await isCommandExists($1)
 *
 * @example         js
 * import { isCommandExists } from '@blackbyte/sugar/is';
 * await  isCommandExists('ls'); // => true
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isCommandExists(command: string): Promise<boolean | string>;
