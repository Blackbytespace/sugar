/**
 * @name            detectProjectType
 * @namespace       node.project
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function allows you to detect the project type like "next", "nuxt", etc...
 * If the project type is not detected, it will return "unknown" for the type and "1.0.0" for the version.
 * Here the list of detected project types:
 *
 * - next
 * - nuxt
 * - astro
 * - remix
 * - sveltekit
 * - laravel
 *
 * @param       {String}            [cwd=process.cwd()]         The root project directory to detect the type from
 * @return      {IDetectProjectTypeResult}                      An object that describe the detected project type
 *
 * @snippet         detectProjectType()
 *
 * @example         js
 * import { detectProjectType } from '@coffeekraken/sugar/project';
 * detectProjectType();
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TDetectProjectTypeResult = {
    type: string;
    version: string;
    rawVersion: string;
    major: number;
    minor: number;
    fix: number;
};
export default function detectProjectType(cwd?: string): TDetectProjectTypeResult;
