import * as fs from 'fs';
import xmlToJson from '../../shared/convert/xmlTojson.js';

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
export default function readXmlSync(path: string): any {
  if (!fs.existsSync(path)) {
    throw new Error(
      `<red>[readXmlSync]</red> Sorry but the passed file path "<cyan>${path}</cyan>" does not exists...`,
    );
  }
  const xmlStr = fs.readFileSync(path, 'utf8').toString();
  const json = xmlToJson(xmlStr);
  return json;
}
