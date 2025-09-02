/**
 * @name            ensureFileSync
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * Ensure that the passed file exists. If not, will be created... (async)
 *
 * @param       {String}              filePath           The file to ensure that it exists...
 *
 * @todo        tests
 *
 * @snippet         ensureFileSync($1)
 *
 * @example       js
 * import { ensureFileSync } from '@blackbyte/sugar/fs';
 * ensureFileSync('my/cool/file.jpg');
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function ensureFileSync(filePath: string): void;
