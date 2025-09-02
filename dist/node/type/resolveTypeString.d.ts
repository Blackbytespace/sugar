import { TTypeStringObject } from '../../shared/type/parseTypeString.js';
/**
 * @name            resolveTypeString
 * @namespace       node.type
 * @type            Function
 * @platform        node
 * @status          beta
 * @async
 *
 * This method simply parse the passed typeString like "string | number", or "string & path", etc... and return
 * an object defining the resolved type with interface if defined, etc...
 *
 * @param     {String}        typeString      The type string to parse
 * @param       {Partial<TResolveTypeStringSettings>}       [settings={}]     A setting object to configure your resolve process
 * @return    {Promise<TResolveTypeStringResult>}             A promise resolved once the type string has been resolved
 *
 * @setting         {String}       [cwd=process.cwd()]          The cwd to use to resolve the type string when they are path
 *
 * @snippet         resolveTypeString($1)
 *
 * @example       js
 * import { resolveTypeString } from '@blackbyte/sugar/type';
 * resolveTypeString('string');
 * // {
 * //    types: [{
 * //       type: 'string',
 * //       of: undefined,
 * //       value: undefined
 * //    }],
 * // }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com>
 */
export type TResolveTypeStringResult = {
    types: TTypeStringObject[];
    raw: string;
};
export type TResolveTypeStringSettings = {
    cwd: string;
};
export default function resolveTypeString(typeString: string, settings?: Partial<TResolveTypeStringSettings>): Promise<TResolveTypeStringResult>;
