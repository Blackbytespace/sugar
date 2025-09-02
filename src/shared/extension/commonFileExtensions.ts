import unique from '../array/unique.js';
import commonAudioFileExtensions from './commonAudioFileExtensions.js';
import commonCompressedFileExtensions from './commonCompressedFileExtensions.js';
import commonDataFileExtensions from './commonDataFileExtensions.js';
import commonDiscFileExtensions from './commonDiscFileExtensions.js';
import commonEmailFileExtensions from './commonEmailFileExtensions.js';
import commonExecutableFileExtensions from './commonExecutableFileExtensions.js';
import commonFontFileExtensions from './commonFontFileExtensions.js';
import commonImageFileExtensions from './commonImageFileExtensions.js';
import commonMediaFileExtensions from './commonMediaFileExtensions.js';
import commonProgrammingFileExtensions from './commonProgrammingFileExtensions.js';
import commonTextFileExtensions from './commonTextFileExtensions.js';
import commonVideoFileExtensions from './commonVideoFileExtensions.js';
import commonWebFileExtensions from './commonWebFileExtensions.js';

/**
 * @name                    commonFileExtensions
 * @namespace               shared.extension
 * @type                    Function
 * @platform                node
 * @platform                js
 * @status                  stable
 *
 * This function allows you to get an array of common file extensions with or without the dot.
 * You can filter extensions by types:
 * - audio
 * - compressed
 * - data
 * - disc
 * - email
 * - executable
 * - font
 * - image
 * - media
 * - programming
 * - text
 * - video
 * - web
 *
 * @param       {TCommonFileExtensionsSettings}           [settings={}]         Settings to customize the function behavior
 * @return      {Array<String>}                           The array of extensions
 *
 * @setting     {Types}          [types=[]]          An array of types to include in the result
 * @setting     {boolean}         [dot=false]         If true, the dot will be added to the extension
 * @setting     {Array<String>}   [exclude=[]]        An array of extensions to exclude
 * @setting     {boolean}         [extended=false]    If true, the extended formats will be included *
 *
 * @snippet         __commonFileExtensions()
 *
 * @example         js
 * import { __commonFileExtensions } from '@blackbyte/sugar/extension';
 * const extensions = __commonFileExtensions(); // => ['avi','mp3',...]
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type Types = (
  | 'audio'
  | 'compressed'
  | 'data'
  | 'disc'
  | 'email'
  | 'executable'
  | 'font'
  | 'image'
  | 'media'
  | 'programming'
  | 'text'
  | 'video'
  | 'web'
)[];

export type TCommonFileExtensionsSettings = {
  types?: Types;
  dot: boolean;
  exclude: string[];
  extended?: boolean;
};

export default function __commonFileExtensions(
  settings: Partial<TCommonFileExtensionsSettings> = {},
): string[] {
  const finalSettings: TCommonFileExtensionsSettings = {
    types: [
      'audio',
      'compressed',
      'data',
      'disc',
      'email',
      'executable',
      'font',
      'image',
      'media',
      'programming',
      'text',
      'video',
      'web',
    ],
    dot: false,
    exclude: [],
    extended: false,
    ...settings,
  };

  return unique([
    ...(finalSettings.types?.includes('audio')
      ? commonAudioFileExtensions(finalSettings)
      : []),
    ...(finalSettings.types?.includes('compressed')
      ? commonCompressedFileExtensions(finalSettings)
      : []),
    ...(finalSettings.types?.includes('data')
      ? commonDataFileExtensions(finalSettings)
      : []),
    ...(finalSettings.types?.includes('disc')
      ? commonDiscFileExtensions(finalSettings)
      : []),
    ...(finalSettings.types?.includes('email')
      ? commonEmailFileExtensions(finalSettings)
      : []),
    ...(finalSettings.types?.includes('executable')
      ? commonExecutableFileExtensions(finalSettings)
      : []),
    ...(finalSettings.types?.includes('font')
      ? commonFontFileExtensions(finalSettings)
      : []),
    ...(finalSettings.types?.includes('image')
      ? commonImageFileExtensions(finalSettings)
      : []),
    ...(finalSettings.types?.includes('media')
      ? commonMediaFileExtensions(finalSettings)
      : []),
    ...(finalSettings.types?.includes('programming')
      ? commonProgrammingFileExtensions(finalSettings)
      : []),
    ...(finalSettings.types?.includes('text')
      ? commonTextFileExtensions(finalSettings)
      : []),
    ...(finalSettings.types?.includes('video')
      ? commonVideoFileExtensions(finalSettings)
      : []),
    ...(finalSettings.types?.includes('web')
      ? commonWebFileExtensions(finalSettings)
      : []),
  ])
    .filter((ext) => !finalSettings.exclude.includes(ext))
    .map((ext) => (finalSettings.dot ? `.${ext}` : ext));
}
