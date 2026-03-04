import fs from 'fs';
import __packageRootDir from '../../package/packageRootDir/packageRootDir.js';

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
 * @param       {String}                      [cwd=process.cwd()]         The root project directory to detect the type from
 * @return      {IDetectProjectTypeResult}                                An object that describe the detected project type
 *
 * @snippet         detectProjectType()
 *
 * @example         js
 * import { detectProjectType } from '@blackbyte/sugar/project';
 * detectProjectType();
 *
 * @since          1.0.0
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

function parseVersion(versionString: string): {
  cleanVersion: string;
  major: number;
  minor: number;
  fix: number;
} {
  // Remove common prefixes like ^ and ~
  const cleanVersion = versionString.replace(/^[\^~]/, '');
  
  // Handle complex versions like "1.2.3-beta.1" by taking only the numeric part
  const numericVersion = cleanVersion.split('-')[0];
  
  const parts = numericVersion.split('.');
  
  return {
    cleanVersion: numericVersion,
    major: parseInt(parts[0]) || 0,
    minor: parseInt(parts[1]) || 0,
    fix: parseInt(parts[2]) || 0,
  };
}

export default function detectProjectType(
  cwd = process.cwd(),
): TDetectProjectTypeResult {
  let packageJson: any = {},
    composerJson: any = {};

  // First try to use the exact cwd, then fall back to packageRootDir
  let searchDir = cwd;
  
  // If we have a package.json in the exact cwd, use it
  if (!fs.existsSync(`${cwd}/package.json`) && !fs.existsSync(`${cwd}/composer.json`)) {
    // No local files, try to find package root
    const foundPackageRootDir = __packageRootDir(cwd);
    if (foundPackageRootDir && foundPackageRootDir !== false) {
      searchDir = foundPackageRootDir;
    }
  }

  try {
    packageJson = JSON.parse(
      fs.readFileSync(`${searchDir}/package.json`, 'utf8').toString(),
    );
  } catch (e) {}
  try {
    composerJson = JSON.parse(
      fs.readFileSync(`${searchDir}/composer.json`, 'utf8').toString(),
    );
  } catch (e) {}

  // detecting the package type laravel
  if (composerJson.require?.['laravel/framework']) {
    const rawVersion = composerJson.require['laravel/framework'];
    const { cleanVersion, major, minor, fix } = parseVersion(rawVersion);
    
    return {
      type: 'laravel',
      version: cleanVersion,
      rawVersion,
      major,
      minor,
      fix,
    };
  }

  // detecting the package type next
  if (
    fs.existsSync(`${searchDir}/next.config.js`) ||
    fs.existsSync(`${searchDir}/next.config.mjs`) ||
    fs.existsSync(`${searchDir}/next.config.ts`)
  ) {
    const rawVersion = packageJson.dependencies?.next;
    if (!rawVersion) {
      // Check devDependencies as well
      const devVersion = packageJson.devDependencies?.next;
      if (!devVersion) {
        throw new Error('Next.js config found but no next dependency in package.json');
      }
      const { cleanVersion, major, minor, fix } = parseVersion(devVersion);
      return {
        type: 'next',
        version: cleanVersion,
        rawVersion: devVersion,
        major,
        minor,
        fix,
      };
    }
    
    const { cleanVersion, major, minor, fix } = parseVersion(rawVersion);
    return {
      type: 'next',
      version: cleanVersion,
      rawVersion,
      major,
      minor,
      fix,
    };
  }

  // detecting the package type nuxt
  if (
    fs.existsSync(`${searchDir}/nuxt.config.js`) ||
    fs.existsSync(`${searchDir}/nuxt.config.mjs`) ||
    fs.existsSync(`${searchDir}/nuxt.config.ts`)
  ) {
    const rawVersion = packageJson.dependencies?.nuxt || packageJson.devDependencies?.nuxt;
    if (!rawVersion) {
      throw new Error('Nuxt.js config found but no nuxt dependency in package.json');
    }
    
    const { cleanVersion, major, minor, fix } = parseVersion(rawVersion);
    return {
      type: 'nuxt',
      version: cleanVersion,
      rawVersion,
      major,
      minor,
      fix,
    };
  }

  // detecting the package type svelte
  if (
    fs.existsSync(`${searchDir}/svelte.config.js`) ||
    fs.existsSync(`${searchDir}/svelte.config.mjs`) ||
    fs.existsSync(`${searchDir}/svelte.config.ts`)
  ) {
    const rawVersion = packageJson.dependencies?.['@sveltejs/kit'] || packageJson.devDependencies?.['@sveltejs/kit'];
    if (!rawVersion) {
      throw new Error('SvelteKit config found but no @sveltejs/kit dependency in package.json');
    }
    
    const { cleanVersion, major, minor, fix } = parseVersion(rawVersion);
    return {
      type: 'sveltekit',
      version: cleanVersion,
      rawVersion,
      major,
      minor,
      fix,
    };
  }

  // detecting the package type astro
  if (
    fs.existsSync(`${searchDir}/astro.config.js`) ||
    fs.existsSync(`${searchDir}/astro.config.mjs`) ||
    fs.existsSync(`${searchDir}/astro.config.ts`)
  ) {
    const rawVersion = packageJson.dependencies?.astro || packageJson.devDependencies?.astro;
    if (!rawVersion) {
      throw new Error('Astro config found but no astro dependency in package.json');
    }
    
    const { cleanVersion, major, minor, fix } = parseVersion(rawVersion);
    return {
      type: 'astro',
      version: cleanVersion,
      rawVersion,
      major,
      minor,
      fix,
    };
  }

  // detecting the package type remix
  if (packageJson.dependencies?.['@remix-run/serve'] || packageJson.devDependencies?.['@remix-run/serve']) {
    const rawVersion = packageJson.dependencies?.['@remix-run/serve'] || packageJson.devDependencies?.['@remix-run/serve'];
    
    const { cleanVersion, major, minor, fix } = parseVersion(rawVersion);
    return {
      type: 'remix',
      version: cleanVersion,
      rawVersion,
      major,
      minor,
      fix,
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
