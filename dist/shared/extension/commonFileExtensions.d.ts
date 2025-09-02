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
export type Types = ('audio' | 'compressed' | 'data' | 'disc' | 'email' | 'executable' | 'font' | 'image' | 'media' | 'programming' | 'text' | 'video' | 'web')[];
export type TCommonFileExtensionsSettings = {
    types?: Types;
    dot: boolean;
    exclude: string[];
    extended?: boolean;
};
export default function __commonFileExtensions(settings?: Partial<TCommonFileExtensionsSettings>): string[];
