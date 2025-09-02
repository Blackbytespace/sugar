import fs from 'fs';
import __packageRootDir from '../package/packageRootDir.js';

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

export default function detectProjectType(
  cwd = process.cwd(),
): TDetectProjectTypeResult {
  let packageJson: any = {},
    composerJson: any = {};

  const packageRootDir = __packageRootDir(cwd);

  try {
    packageJson = JSON.parse(
      fs.readFileSync(`${packageRootDir}/package.json`, 'utf8').toString(),
    );
  } catch (e) {}
  try {
    composerJson = JSON.parse(
      fs.readFileSync(`${packageRootDir}/composer.json`, 'utf8').toString(),
    );
  } catch (e) {}

  // detecting the package type laravel
  if (composerJson.require?.['laravel/framework']) {
    const version = composerJson.require['laravel/framework'].replace(/\^/, '');
    return {
      type: 'laravel',
      version,
      rawVersion: composerJson.require['laravel/framework'],
      major: parseInt(version.split('.')[0]),
      minor: parseInt(version.split('.')[1]),
      fix: parseInt(version.split('.')[2]),
    };
  }

  // detecting the package type next
  if (
    fs.existsSync(`${packageRootDir}/next.config.js`) ||
    fs.existsSync(`${packageRootDir}/next.config.mjs`) ||
    fs.existsSync(`${packageRootDir}/next.config.ts`)
  ) {
    const version = packageJson.dependencies?.next.replace(/\^/, '');
    return {
      type: 'next',
      version,
      rawVersion: packageJson.dependencies.next,
      major: parseInt(version.split('.')[0]),
      minor: parseInt(version.split('.')[1]),
      fix: parseInt(version.split('.')[2]),
    };
  }

  // detecting the package type nuxt
  if (
    fs.existsSync(`${packageRootDir}/nuxt.config.js`) ||
    fs.existsSync(`${packageRootDir}/nuxt.config.mjs`) ||
    fs.existsSync(`${packageRootDir}/nuxt.config.ts`)
  ) {
    const version = packageJson.dependencies.nuxt.replace(/\^/, '');
    return {
      type: 'nuxt',
      version,
      rawVersion: packageJson.dependencies.nuxt,
      major: parseInt(version.split('.')[0]),
      minor: parseInt(version.split('.')[1]),
      fix: parseInt(version.split('.')[2]),
    };
  }

  // detecting the package type svelte
  if (
    fs.existsSync(`${packageRootDir}/svelte.config.js`) ||
    fs.existsSync(`${packageRootDir}/svelte.config.mjs`) ||
    fs.existsSync(`${packageRootDir}/svelte.config.ts`)
  ) {
    const version = packageJson.dependencies?.['@sveltejs/kit'].replace(
      /\^/,
      '',
    );
    return {
      type: 'sveltekit',
      version,
      rawVersion: packageJson.dependencies['@sveltejs/kit'],
      major: parseInt(version.split('.')[0]),
      minor: parseInt(version.split('.')[1]),
      fix: parseInt(version.split('.')[2]),
    };
  }

  // detecting the package type astro
  if (
    fs.existsSync(`${packageRootDir}/astro.config.js`) ||
    fs.existsSync(`${packageRootDir}/astro.config.mjs`) ||
    fs.existsSync(`${packageRootDir}/astro.config.ts`)
  ) {
    const version = packageJson.dependencies?.astro.replace(/\^/, '');
    return {
      type: 'astro',
      version,
      rawVersion: packageJson.dependencies.astro,
      major: parseInt(version.split('.')[0]),
      minor: parseInt(version.split('.')[1]),
      fix: parseInt(version.split('.')[2]),
    };
  }

  // detecting the package type remix
  if (packageJson.dependencies?.['@remix-run/serve']) {
    const version = packageJson.dependencies['@remix-run/serve'].replace(
      /\^/,
      '',
    );
    return {
      type: 'remix',
      version,
      rawVersion: packageJson.dependencies['@remix-run/serve'],
      major: parseInt(version.split('.')[0]),
      minor: parseInt(version.split('.')[1]),
      fix: parseInt(version.split('.')[2]),
    };
  }

  return {
    type: 'unknown',
    version: '1.0.0',
    rawVersion: '1.0.0',
    major: 1,
    minor: 0,
    fix: 0,
  };
}
