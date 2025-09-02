/**
 * @name            folderHashSync
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * This function allows you to get back an integrity hash for the passed folder.
 * This mean that if a folder returns the same integrity hash twice, the folder or files in it
 * has not been updated...
 *
 * @param           {String}            folderPath      The folder path you want to get the hash back
 * @param           {TFolderHashSettings}       [settings={}]       Some settings to configure your hash generation process
 * @return          {String}                            The calculated folder hash
 *
 * @setting         {Boolean}           [recursive=true]            Specify if you want to generate a hash using also the children or not
 * @setting         {String}            [algo='sha356']             The algorithm to use
 * @setting         {BinaryToTextEncoding}      [digest='base64']       How to digest the hash
 *
 * @snippet         folderHashSync($1)
 *
 * @example         js
 * import { folderHashSync } from '@blackbyte/sugar/fs';
 * folderHashSync('my/cool/folder'); // => YZOrKDx9LCLd8X39PoFTflXGpRU=,
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TFolderHashSettings = {
    recursive: boolean;
    algo: 'md5' | 'sha1' | 'sha256' | 'sha512';
    encoding: 'hex' | 'base64' | 'buffer' | 'latin1';
};
export default function folderHashSync(folderPath: string, settings?: Partial<TFolderHashSettings>): string;
