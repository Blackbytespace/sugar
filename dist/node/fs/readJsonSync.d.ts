/**
 * @name            readJsonSync
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * This function allows you to read a json file
 *
 * @param       {String}           path            The json file path to read
 * @return      {Object}                            The readed json
 *
 * @todo            tests
 *
 * @snippet         readJsonSync($1)
 *
 * @example         js
 * import { readJsonSync } from '@blackbyte/sugar/fs';
 * readJsonSync('my-cool-json/file.json');
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function readJsonSync(path: string): any;
