import { test, expect, beforeAll, afterAll } from 'vitest';
import fs from 'fs';
import os from 'os';
import path from 'path';
import detectProjectType from './detectProjectType.js';

// Test directory for creating temporary projects (use os.tmpdir to avoid vitest scanning project files)
const testDir = path.join(os.tmpdir(), 'test-detect-project-type');

// Setup test directory
beforeAll(() => {
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true, force: true });
  }
  fs.mkdirSync(testDir, { recursive: true });
});

// Cleanup test directory
afterAll(() => {
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true, force: true });
  }
});

test('detectProjectType basic functionality', () => {
  // Test default behavior - should return unknown for empty directory
  const emptyDirResult = detectProjectType(testDir);
  expect(emptyDirResult).toEqual({
    type: 'unknown',
    version: '1.0.0',
    rawVersion: '1.0.0',
    major: 1,
    minor: 0,
    fix: 0,
  });

  // Test Laravel project detection
  const laravelDir = path.join(testDir, 'laravel-project');
  fs.mkdirSync(laravelDir, { recursive: true });

  // Create composer.json for Laravel
  fs.writeFileSync(
    path.join(laravelDir, 'composer.json'),
    JSON.stringify(
      {
        require: {
          'laravel/framework': '^10.2.1',
        },
      },
      null,
      2,
    ),
  );

  const laravelResult = detectProjectType(laravelDir);
  expect(laravelResult.type).toBe('laravel');
  expect(laravelResult.version).toBe('10.2.1');
  expect(laravelResult.rawVersion).toBe('^10.2.1');
  expect(laravelResult.major).toBe(10);
  expect(laravelResult.minor).toBe(2);
  expect(laravelResult.fix).toBe(1);

  // Test Next.js project detection
  const nextDir = path.join(testDir, 'next-project');
  fs.mkdirSync(nextDir, { recursive: true });

  // Create package.json for Next.js
  fs.writeFileSync(
    path.join(nextDir, 'package.json'),
    JSON.stringify(
      {
        name: 'test-next-app',
        version: '1.0.0',
        dependencies: {
          next: '^14.1.0',
          react: '^18.2.0',
        },
      },
      null,
      2,
    ),
  );
  // Create next.config.js
  fs.writeFileSync(
    path.join(nextDir, 'next.config.js'),
    'module.exports = {};',
  );

  const nextResult = detectProjectType(nextDir);
  expect(nextResult.type).toBe('next');
  expect(nextResult.version).toBe('14.1.0');
  expect(nextResult.rawVersion).toBe('^14.1.0');
  expect(nextResult.major).toBe(14);
  expect(nextResult.minor).toBe(1);
  expect(nextResult.fix).toBe(0);

  // Test return type structure
  const result = detectProjectType(testDir);
  expect(result).toHaveProperty('type');
  expect(result).toHaveProperty('version');
  expect(result).toHaveProperty('rawVersion');
  expect(result).toHaveProperty('major');
  expect(result).toHaveProperty('minor');
  expect(result).toHaveProperty('fix');
});

test('detectProjectType framework detection', () => {
  // Test Nuxt.js project detection
  const nuxtDir = path.join(testDir, 'nuxt-project');
  fs.mkdirSync(nuxtDir, { recursive: true });

  fs.writeFileSync(
    path.join(nuxtDir, 'package.json'),
    JSON.stringify(
      {
        name: 'test-nuxt-app',
        version: '1.0.0',
        dependencies: {
          nuxt: '^3.8.0',
        },
      },
      null,
      2,
    ),
  );
  fs.writeFileSync(path.join(nuxtDir, 'nuxt.config.ts'), 'export default {};');

  const nuxtResult = detectProjectType(nuxtDir);
  expect(nuxtResult.type).toBe('nuxt');
  expect(nuxtResult.version).toBe('3.8.0');

  // Test SvelteKit project detection
  const svelteDir = path.join(testDir, 'svelte-project');
  fs.mkdirSync(svelteDir, { recursive: true });

  fs.writeFileSync(
    path.join(svelteDir, 'package.json'),
    JSON.stringify(
      {
        name: 'test-svelte-app',
        version: '1.0.0',
        dependencies: {
          '@sveltejs/kit': '^2.0.0',
        },
      },
      null,
      2,
    ),
  );
  fs.writeFileSync(
    path.join(svelteDir, 'svelte.config.js'),
    'export default {};',
  );

  const svelteResult = detectProjectType(svelteDir);
  expect(svelteResult.type).toBe('sveltekit');
  expect(svelteResult.version).toBe('2.0.0');

  // Test Astro project detection
  const astroDir = path.join(testDir, 'astro-project');
  fs.mkdirSync(astroDir, { recursive: true });

  fs.writeFileSync(
    path.join(astroDir, 'package.json'),
    JSON.stringify(
      {
        name: 'test-astro-app',
        version: '1.0.0',
        dependencies: {
          astro: '^4.0.1',
        },
      },
      null,
      2,
    ),
  );
  fs.writeFileSync(
    path.join(astroDir, 'astro.config.mjs'),
    'export default {};',
  );

  const astroResult = detectProjectType(astroDir);
  expect(astroResult.type).toBe('astro');
  expect(astroResult.version).toBe('4.0.1');

  // Test Remix project detection
  const remixDir = path.join(testDir, 'remix-project');
  fs.mkdirSync(remixDir, { recursive: true });

  fs.writeFileSync(
    path.join(remixDir, 'package.json'),
    JSON.stringify(
      {
        name: 'test-remix-app',
        version: '1.0.0',
        dependencies: {
          '@remix-run/serve': '^2.5.0',
        },
      },
      null,
      2,
    ),
  );

  const remixResult = detectProjectType(remixDir);
  expect(remixResult.type).toBe('remix');
  expect(remixResult.version).toBe('2.5.0');
});

test('detectProjectType edge cases and error handling', () => {
  // Test default behavior when called without arguments
  const currentDirResult = detectProjectType();
  expect(currentDirResult).toBeDefined();
  expect(typeof currentDirResult.type).toBe('string');
  expect(typeof currentDirResult.version).toBe('string');

  // Test with non-existent directory
  const nonExistentResult = detectProjectType('/path/that/does/not/exist');
  expect(nonExistentResult.type).toBe('unknown');
  expect(nonExistentResult.version).toBe('1.0.0');

  // Test different config file extensions - Next.js with .mjs config
  const nextMjsDir = path.join(testDir, 'next-mjs');
  fs.mkdirSync(nextMjsDir, { recursive: true });
  fs.writeFileSync(
    path.join(nextMjsDir, 'package.json'),
    JSON.stringify(
      {
        name: 'test-app',
        version: '1.0.0',
        dependencies: { next: '^14.0.0' },
      },
      null,
      2,
    ),
  );
  fs.writeFileSync(
    path.join(nextMjsDir, 'next.config.mjs'),
    'export default {};',
  );

  const nextMjsResult = detectProjectType(nextMjsDir);
  expect(nextMjsResult.type).toBe('next');

  // Test priority - Laravel should be detected first if both Laravel and Next.js are present
  const hybridDir = path.join(testDir, 'hybrid-project');
  fs.mkdirSync(hybridDir, { recursive: true });
  fs.writeFileSync(
    path.join(hybridDir, 'composer.json'),
    JSON.stringify(
      {
        require: { 'laravel/framework': '^10.0.0' },
      },
      null,
      2,
    ),
  );
  fs.writeFileSync(
    path.join(hybridDir, 'package.json'),
    JSON.stringify(
      {
        name: 'hybrid-app',
        version: '1.0.0',
        dependencies: { next: '^14.0.0' },
      },
      null,
      2,
    ),
  );
  fs.writeFileSync(path.join(hybridDir, 'next.config.js'), '{}');

  const hybridResult = detectProjectType(hybridDir);
  expect(hybridResult.type).toBe('laravel'); // Laravel should be detected first

  // Test version parsing with complex version strings
  const complexVersionDir = path.join(testDir, 'complex-version');
  fs.mkdirSync(complexVersionDir, { recursive: true });
  fs.writeFileSync(
    path.join(complexVersionDir, 'composer.json'),
    JSON.stringify(
      {
        require: { 'laravel/framework': '^10.2.3-beta.1' },
      },
      null,
      2,
    ),
  );

  const complexResult = detectProjectType(complexVersionDir);
  expect(complexResult.type).toBe('laravel');
  expect(complexResult.version).toBe('10.2.3'); // Should parse cleanly
  expect(complexResult.major).toBe(10);
  expect(complexResult.minor).toBe(2);
  expect(complexResult.fix).toBe(3);

  // Test dependencies in devDependencies
  const devDepsDir = path.join(testDir, 'dev-deps');
  fs.mkdirSync(devDepsDir, { recursive: true });
  fs.writeFileSync(
    path.join(devDepsDir, 'package.json'),
    JSON.stringify(
      {
        name: 'test-app',
        version: '1.0.0',
        devDependencies: {
          next: '^14.0.0',
        },
      },
      null,
      2,
    ),
  );
  fs.writeFileSync(path.join(devDepsDir, 'next.config.js'), '{}');

  const devDepsResult = detectProjectType(devDepsDir);
  expect(devDepsResult.type).toBe('next');
  expect(devDepsResult.version).toBe('14.0.0');

  // Test error case - Next.js config without dependency
  const noDepsDir = path.join(testDir, 'no-deps');
  fs.mkdirSync(noDepsDir, { recursive: true });
  fs.writeFileSync(
    path.join(noDepsDir, 'package.json'),
    JSON.stringify(
      {
        name: 'test-app',
        version: '1.0.0',
      },
      null,
      2,
    ),
  );
  fs.writeFileSync(path.join(noDepsDir, 'next.config.js'), '{}');

  expect(() => detectProjectType(noDepsDir)).toThrow(
    'Next.js config found but no next dependency in package.json',
  );
});
