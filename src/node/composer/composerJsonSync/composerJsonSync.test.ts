import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import composerJsonSync from './composerJsonSync.js';

// Mock dependencies
vi.mock('fs', () => ({
  default: {
    readFileSync: vi.fn(),
    existsSync: vi.fn(),
  },
}));

vi.mock('../composerPackageDir/composerPackageDir.js', () => ({
  default: vi.fn(),
}));

import fs from 'fs';
import composerPackageDirMock from '../composerPackageDir/composerPackageDir.js';

describe('composerJsonSync', () => {
  const mockReadFileSync = vi.mocked(fs.readFileSync);
  const mockComposerPackageDir = vi.mocked(composerPackageDirMock);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should read and parse composer.json for current package', () => {
    const packageDir = '/project/root';
    const composerJson = {
      name: 'test/package',
      version: '1.0.0',
      description: 'Test package',
    };

    mockComposerPackageDir.mockReturnValue(packageDir);
    mockReadFileSync.mockReturnValue(JSON.stringify(composerJson));

    const result = composerJsonSync('.');

    expect(result).toEqual(composerJson);
    expect(mockComposerPackageDir).toHaveBeenCalledWith('.', {
      cwd: process.cwd(),
      monorepo: false,
      checkExistence: true,
    });
    expect(mockReadFileSync).toHaveBeenCalledWith(
      `${packageDir}/composer.json`,
      'utf8',
    );
  });

  it('should read and parse composer.json for specific package', () => {
    const packageName = 'vendor/package';
    const packageDir = '/project/vendor/vendor/package';
    const composerJson = {
      name: packageName,
      version: '2.1.0',
      type: 'library',
    };

    mockComposerPackageDir.mockReturnValue(packageDir);
    mockReadFileSync.mockReturnValue(JSON.stringify(composerJson));

    const result = composerJsonSync(packageName);

    expect(result).toEqual(composerJson);
    expect(mockComposerPackageDir).toHaveBeenCalledWith(packageName, {
      cwd: process.cwd(),
      monorepo: false,
      checkExistence: true,
    });
  });

  it('should use custom settings', () => {
    const settings = {
      cwd: '/custom/cwd',
      monorepo: true,
      checkExistence: false,
    };
    const packageDir = '/custom/package/dir';
    const composerJson = { name: 'custom/package' };

    mockComposerPackageDir.mockReturnValue(packageDir);
    mockReadFileSync.mockReturnValue(JSON.stringify(composerJson));

    const result = composerJsonSync('test/package', settings);

    expect(result).toEqual(composerJson);
    expect(mockComposerPackageDir).toHaveBeenCalledWith(
      'test/package',
      settings,
    );
  });

  it('should handle partial settings and merge with defaults', () => {
    const partialSettings = { monorepo: true };
    const expectedSettings = {
      cwd: process.cwd(),
      monorepo: true,
      checkExistence: true,
    };
    const packageDir = '/package/dir';
    const composerJson = { name: 'partial/package' };

    mockComposerPackageDir.mockReturnValue(packageDir);
    mockReadFileSync.mockReturnValue(JSON.stringify(composerJson));

    composerJsonSync('test', partialSettings);

    expect(mockComposerPackageDir).toHaveBeenCalledWith(
      'test',
      expectedSettings,
    );
  });

  it('should handle complex composer.json structure', () => {
    const packageDir = '/complex/package';
    const composerJson = {
      name: 'complex/package',
      version: '3.2.1',
      description: 'A complex package',
      type: 'library',
      keywords: ['php', 'library'],
      authors: [{ name: 'Test Author', email: 'test@example.com' }],
      require: {
        php: '^8.0',
        'vendor/dependency': '^1.0',
      },
      'require-dev': {
        'phpunit/phpunit': '^9.0',
      },
      autoload: {
        'psr-4': {
          'Complex\\Package\\': 'src/',
        },
      },
    };

    mockComposerPackageDir.mockReturnValue(packageDir);
    mockReadFileSync.mockReturnValue(JSON.stringify(composerJson));

    const result = composerJsonSync('complex/package');

    expect(result).toEqual(composerJson);
  });

  it('should handle empty composer.json', () => {
    const packageDir = '/empty/package';
    const emptyJson = {};

    mockComposerPackageDir.mockReturnValue(packageDir);
    mockReadFileSync.mockReturnValue(JSON.stringify(emptyJson));

    const result = composerJsonSync('empty');

    expect(result).toEqual(emptyJson);
  });

  it('should return object type', () => {
    const packageDir = '/test/package';
    const composerJson = { name: 'test/type' };

    mockComposerPackageDir.mockReturnValue(packageDir);
    mockReadFileSync.mockReturnValue(JSON.stringify(composerJson));

    const result = composerJsonSync('test');

    expect(typeof result).toBe('object');
    expect(result).not.toBeNull();
  });

  it('should handle undefined settings', () => {
    const packageDir = '/default/package';
    const composerJson = { name: 'default/package' };

    mockComposerPackageDir.mockReturnValue(packageDir);
    mockReadFileSync.mockReturnValue(JSON.stringify(composerJson));

    const result = composerJsonSync('default', undefined);

    expect(result).toEqual(composerJson);
    expect(mockComposerPackageDir).toHaveBeenCalledWith('default', {
      cwd: process.cwd(),
      monorepo: false,
      checkExistence: true,
    });
  });

  it('should throw error if JSON parsing fails', () => {
    const packageDir = '/invalid/package';

    mockComposerPackageDir.mockReturnValue(packageDir);
    mockReadFileSync.mockReturnValue('invalid json content');

    expect(() => {
      composerJsonSync('invalid');
    }).toThrow();
  });

  it('should handle composer.json with special characters', () => {
    const packageDir = '/special/package';
    const composerJson = {
      name: 'special/package',
      description: 'Package with special chars: àáâãäåæçèéêë',
      keywords: ['spécial', 'carácteres'],
    };

    mockComposerPackageDir.mockReturnValue(packageDir);
    mockReadFileSync.mockReturnValue(JSON.stringify(composerJson));

    const result = composerJsonSync('special');

    expect(result).toEqual(composerJson);
  });
});
