import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import composerPackageDir from './composerPackageDir.js';

// Mock dependencies
vi.mock('fs', () => ({
  default: {
    existsSync: vi.fn(),
  },
}));

vi.mock('path', () => ({
  default: {
    resolve: vi.fn(),
  },
}));

vi.mock('../composerVendorDir/composerVendorDir.js', () => ({
  default: vi.fn(),
}));

import fs from 'fs';
import path from 'path';
import composerVendorDirMock from '../composerVendorDir/composerVendorDir.js';

describe('composerPackageDir', () => {
  const mockExistsSync = vi.mocked(fs.existsSync);
  const mockResolve = vi.mocked(path.resolve);
  const mockComposerVendorDir = vi.mocked(composerVendorDirMock);

  beforeEach(() => {
    vi.clearAllMocks();
    // Setup default mocks
    mockResolve.mockImplementation((p: string) => p);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return absolute path when composer.json exists in the path', () => {
    const testPath = '/absolute/path/to/package';
    mockExistsSync.mockImplementation(
      (p) => String(p) === `${testPath}/composer.json`,
    );
    mockResolve.mockReturnValue('/resolved/absolute/path');

    const result = composerPackageDir(testPath);

    expect(result).toBe('/resolved/absolute/path');
    expect(mockResolve).toHaveBeenCalledWith(testPath);
    expect(mockExistsSync).toHaveBeenCalledWith(`${testPath}/composer.json`);
  });

  it('should return current package directory for "." parameter', () => {
    const vendorDir = '/project/vendor';
    mockExistsSync.mockReturnValue(false); // No composer.json in "."
    mockComposerVendorDir.mockReturnValue(vendorDir);
    mockResolve.mockReturnValue('/project');

    const result = composerPackageDir('.');

    expect(result).toBe('/project');
    expect(mockResolve).toHaveBeenCalledWith('/project/vendor/../');
    expect(mockComposerVendorDir).toHaveBeenCalled();
  });

  it('should throw error when package does not exist and checkExistence is true', () => {
    const packageName = 'vendor/package';
    const vendorDir = '/project/vendor';

    mockExistsSync.mockImplementation((p) => {
      const path = String(p);
      if (path === `${packageName}/composer.json`) return false;
      if (path === `${vendorDir}/${packageName}/composer.json`) return false;
      return false;
    });
    mockComposerVendorDir.mockReturnValue(vendorDir);

    expect(() => {
      composerPackageDir(packageName, { checkExistence: true });
    }).toThrow('The Composer package');
  });

  it('should not throw error when package does not exist but checkExistence is false', () => {
    const packageName = 'vendor/package';
    const vendorDir = '/project/vendor';

    mockExistsSync.mockReturnValue(false);
    mockComposerVendorDir.mockReturnValue(vendorDir);

    const result = composerPackageDir(packageName, { checkExistence: false });

    expect(result).toBe(`${vendorDir}/${packageName}`);
  });

  it('should return correct package path when package exists in vendor directory', () => {
    const packageName = 'psr/log';
    const vendorDir = '/project/vendor';

    mockExistsSync.mockImplementation((p) => {
      const path = String(p);
      if (path === `${packageName}/composer.json`) return false;
      if (path === `${vendorDir}/${packageName}/composer.json`) return true;
      return false;
    });
    mockComposerVendorDir.mockReturnValue(vendorDir);

    const result = composerPackageDir(packageName);

    expect(result).toBe(`${vendorDir}/${packageName}`);
  });

  it('should pass settings to composerVendorDir', () => {
    const settings = {
      cwd: '/custom/cwd',
      monorepo: true,
      checkExistence: false,
    };
    const vendorDir = '/custom/vendor';

    mockExistsSync.mockReturnValue(false);
    mockComposerVendorDir.mockReturnValue(vendorDir);

    composerPackageDir('test/package', settings);

    expect(mockComposerVendorDir).toHaveBeenCalledWith(settings);
  });

  it('should use default settings when none provided', () => {
    const vendorDir = '/default/vendor';
    mockExistsSync.mockReturnValue(false);
    mockComposerVendorDir.mockReturnValue(vendorDir);

    const result = composerPackageDir('test/package', {
      checkExistence: false,
    });

    expect(mockComposerVendorDir).toHaveBeenCalledWith({
      cwd: process.cwd(),
      monorepo: false,
      checkExistence: false,
    });
  });

  it('should handle relative paths correctly', () => {
    const relativePath = './relative/path';
    mockExistsSync.mockImplementation(
      (p) => String(p) === `${relativePath}/composer.json`,
    );
    mockResolve.mockReturnValue('/resolved/relative/path');

    const result = composerPackageDir(relativePath);

    expect(result).toBe('/resolved/relative/path');
  });

  it('should return string type', () => {
    mockExistsSync.mockReturnValue(false);
    mockComposerVendorDir.mockReturnValue('/vendor');

    const result = composerPackageDir('test', { checkExistence: false });

    expect(typeof result).toBe('string');
  });

  it('should handle empty package name', () => {
    const vendorDir = '/project/vendor';
    mockExistsSync.mockReturnValue(false);
    mockComposerVendorDir.mockReturnValue(vendorDir);

    const result = composerPackageDir('', { checkExistence: false });

    expect(result).toBe(`${vendorDir}/`);
  });
});
