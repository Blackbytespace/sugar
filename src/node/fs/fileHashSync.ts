import { hashFileSync } from 'hasha';

/**
 * @name            fileHashSync
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * This function allows you to get back an integrity hash for the passed file.
 * This mean that if a file returns the same integrity hash twice, the folder or files in it
 * has not been updated...
 *
 * @param           {String}            filePath      The folder path you want to get the hash back
 * @param           {TFileHashSettings}       [settings={}]       Some settings to configure your hash generation process
 * @return          {String}                            The calculated folder hash
 *
 * @setting         {String}            [algo='sha356']             The algorithm to use
 * @setting         {BinaryToTextEncoding}      [digest='base64']       How to digest the hash
 *
 * @todo            tests
 *
 * @snippet         fileHashSync($1)
 *
 * @example         js
 * import { fileHashSync } from '@blackbyte/sugar/fs';
 * fileHashSync('my/cool/folder'); // => YZOrKDx9LCLd8X39PoFTflXGpRU=,
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TFileHashSettings = {
  algo: 'md5' | 'sha1' | 'sha256' | 'sha512';
  encoding: 'hex' | 'base64' | 'buffer' | 'latin1';
};

export default function fileHashSync(
  filePath: string,
  settings: Partial<TFileHashSettings> = {},
): string {
  const finalSettings: TFileHashSettings = {
    algo: 'sha256',
    encoding: 'base64',
    ...(settings ?? {}),
  };

  return hashFileSync(filePath, {
    algorithm: finalSettings.algo,
    // @ts-ignore
    encoding: finalSettings.encoding,
  });
}
