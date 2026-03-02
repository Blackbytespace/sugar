/**
 * @name                 extension
 * @namespace            node.fs
 * @type                 Function
 * @platform             node
 * @status               stable
 *
 * Return the passed file path extension
 *
 * @param           {String}            path                The file path to get the extension from
 * @return          {String}                                The file extension
 *
 * @todo        tests
 *
 * @snippet         extension($1)
 *
 * @example         js
 * import { extension } from '@blackbyte/sugar/fs';
 * extension('hello/world.jpg'); // => jpg
 *
 * @since         1.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function extension(path: string): string;
