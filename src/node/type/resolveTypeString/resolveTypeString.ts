import fs from 'fs';
import __path from 'path';
import parseTypeString, {
  TTypeStringObject,
} from '../../../shared/type/parseTypeString/parseTypeString.js';
import { packageRootDir } from '@blackbyte/sugar/package';

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
 * @param       {String}                                    typeString          The type string to parse
 * @param       {Partial<TResolveTypeStringSettings>}       [settings={}]       A setting object to configure your resolve process
 * @return      {Promise<TResolveTypeStringResult>}                             A promise resolved once the type string has been resolved
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
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com>
 */

export type TResolveTypeStringResult = {
  types: TTypeStringObject[];
  raw: string;
};

export type TResolveTypeStringSettings = {
  cwd: string;
};

export default async function resolveTypeString(
  typeString: string,
  settings: Partial<TResolveTypeStringSettings> = {},
): Promise<TResolveTypeStringResult> {
  const finalSettings: TResolveTypeStringSettings = {
    cwd: process.cwd(),
    ...settings,
  };

  let types: TTypeStringObject[] | undefined, interf;

  if (typeString.match(/^(\.|\/)/)) {
    // resolve tokens
    const path = typeString;

    let potentialTypeFilePath;

    if (typeString.match(/^\./)) {
      // relative path from cwd
      potentialTypeFilePath = __path.resolve(finalSettings.cwd, path);
    } else {
      // absolute path or package root relative path
      potentialTypeFilePath = __path.resolve(
        packageRootDir(finalSettings.cwd),
        path,
      );
    }

    if (fs.existsSync(potentialTypeFilePath)) {
      // @ts-ignore
      const typeData = (await import(potentialTypeFilePath)).default;
      types = [
        {
          type: typeData.name ?? 'unknown',
          of: undefined,
          value: undefined,
        },
      ];
      // save data into the "metas" property on the string directly
      interf = typeData.toObject?.() ?? typeData;
    } else {
      // File doesn't exist, fallback to parsing as regular type string
      types = parseTypeString(typeString);
    }
    // regular types
  } else {
    types = parseTypeString(typeString);
  }

  // Ensure types is always defined
  if (!types) {
    types = [{ type: 'unknown', of: undefined, value: undefined }];
  }

  return {
    types,
    raw: typeString.trim().replace(/^\{/, '').replace(/\}$/, ''),
  };
}
