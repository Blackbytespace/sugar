/**
 * @name            moveSync
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * Moves a file or directory, even across devices (sync)
 *
 * @param       {String}              src           The source path to moveSync
 * @param       {String}              dest          The destination path
 *
 * @snippet         moveSync($1, $2)
 *
 * @example       js
 * import { moveSync } from '@blackbyte/sugar/fs';
 * moveSync('my/cool/dir', 'another/place/for/directory');
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function moveSync(src: string, dest: string): void;
