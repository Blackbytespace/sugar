/**
 * @name            readJson
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          stable
 * @async
 *
 * This function allows you to read a json file
 *
 * @param       {String}           path            The json file path to read
 * @return      {Object}                            The readed json
 *
 * @snippet         readJson($1)
 * await readJson($1)
 *
 * @example         js
 * import { readJson } from '@blackbyte/sugar/fs';
 * await readJson('my-cool-json/file.json');
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function readJson(path: string): Promise<any>;
