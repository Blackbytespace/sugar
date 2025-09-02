/**
 * @name            isSymlink
 * @namespace       node.is
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * This function check if the passed string path is a sySlink or not
 *
 * @param     {String}        path        The path to check
 * @return    {Boolean}                   true if is a sySlink, false if not
 *
 * @todo      tests
 *
 * @snippet         isSymlink($1)
 *
 * @example     js
 * import { isSymlink } from '@blackbyte/sugar/is';
 * isSymlink('something/cool');
 *
 * @todo        Tests
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isSymlink(path: string): boolean;
