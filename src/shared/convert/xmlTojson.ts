import { XMLParser } from 'fast-xml-parser';

/**
 * @name                xmlToJson
 * @namespace           shared.convert
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * This function take a xml string as input and return a json object.
 *
 * @param       {String}            xml             The xml string to convert
 * @return      {Object}                            The corresponding json object
 *
 * @snippet         xmlToJson($1)
 *
 * @example         js
 * import ( xmlToJson ) from '@blackbyte/sugar/convert';
 * xmlToJson('...');
 *
 * @todo    tests
 *
 * @see             https://www.npmjs.com/package/fast-xml-parser
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function xmlToJson(xml: string): any {
  const parser = new XMLParser();
  return parser.parse(xml);
}
