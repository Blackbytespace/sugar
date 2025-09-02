/**
 * @name            readXmlSync
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * This function allows you to read an xml file and get his content back as JSON
 *
 * @param       {String}           path            The xml file path to read
 * @return      {Object}                            The readed json
 *
 * @todo            tests
 *
 * @snippet         readXmlSync($1)
 *
 * @example         js
 * import { readXmlSync } from '@blackbyte/sugar/fs';
 * readXmlSync('my-cool-xml/file.xml');
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function readXmlSync(path: string): any;
