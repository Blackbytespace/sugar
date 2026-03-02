/**
 * @name            parseTypeString
 * @namespace       shared.type
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This method simply parse the passed typeString like "string | number", or "string & path", etc... and return
 * an object defining this type string
 *
 * @param     {String}        typeString      The type string to parse
 * @return    {TTypeStringObject[]}             An array of object(s) describing the type string passed
 *
 * @snippet         parseTypeString($1)
 *
 * @example       js
 * import { parseTypeString } from '@blackbyte/sugar/type';
 * parseTypeString('string|number');
 * //[{
 * //   type: 'string',
 * //   of: undefined,
 * //}, {
 * //   type: 'number',
 * //   of: undefined,
 * //}]
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com>
 */
export type TTypeStringObject = {
    type: string;
    of: string[] | undefined;
    value?: any;
};
export type TParseTypeStringSingleResultObj = {};
export default function parseTypeString(typeString: string): TTypeStringObject[];
