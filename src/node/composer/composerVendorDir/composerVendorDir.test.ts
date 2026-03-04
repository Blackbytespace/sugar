import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import composerVendorDir from './composerVendorDir.js';

// Mock fs module
vi.mock('fs', () => ({
  default: {
    existsSync: vi.fn(),
  },
}));

// Mock packageRootDir
vi.mock('@blackbyte/sugar/package', () => ({
  packageRootDir: vi.fn(),
}));

import fs from 'fs';
import { packageRootDir } from '@blackbyte/sugar/package';

describe('composerVendorDir', () => {
  const mockExistsSync = vi.mocked(fs.existsSync);
  const mockPackageRootDir = vi.mocked(packageRootDir);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return vendor directory path when it exists', () => {
    mockPackageRootDir.mockReturnValue('/project/root');
    mockExistsSync.mockReturnValue(true);

    const result = composerVendorDir();

    expect(result).toBe('/project/root/vendor');
    expect(mockPackageRootDir).toHaveBeenCalledWith(process.cwd(), {
      highest: false,
    });
    expect(mockExistsSync).toHaveBeenCalledWith('/project/root/vendor');
  });

  it('should use custom cwd when provided', () => {
    const customCwd = '/custom/path';
    mockPackageRootDir.mockReturnValue('/custom/root');
    mockExistsSync.mockReturnValue(true);

    composerVendorDir({ cwd: customCwd });

    expect(mockPackageRootDir).toHaveBeenCalledWith(customCwd, {
      highest: false,
    });
  });

  it('should use monorepo mode when enabled', () => {
    mockPackageRootDir.mockReturnValue('/monorepo/root');
    mockExistsSync.mockReturnValue(true);

    composerVendorDir({ monorepo: true });

    expect(mockPackageRootDir).toHaveBeenCalledWith(process.cwd(), {
      highest: true,
    });
  });

  it('should throw error when vendor directory does not exist and checkExistence is true', () => {
    mockPackageRootDir.mockReturnValue('/project/root');
    mockExistsSync.mockReturnValue(false);

    expect(() => {
      composerVendorDir({ checkExistence: true });
    }).toThrow('The composer vendors directory');
  });

  it('should not throw error when vendor directory does not exist but checkExistence is false', () => {
    mockPackageRootDir.mockReturnValue('/project/root');
    mockExistsSync.mockReturnValue(false);

    const result = composerVendorDir({ checkExistence: false });

    expect(result).toBe('/project/root/vendor');
    expect(mockExistsSync).not.toHaveBeenCalled();
  });

  it('should use default settings when no settings provided', () => {
    mockPackageRootDir.mockReturnValue('/default/root');
    mockExistsSync.mockReturnValue(true);

    const result = composerVendorDir();

    expect(result).toBe('/default/root/vendor');
    expect(mockPackageRootDir).toHaveBeenCalledWith(process.cwd(), {
      highest: false,
    });
    expect(mockExistsSync).toHaveBeenCalledWith('/default/root/vendor');
  });

  it('should handle empty settings object', () => {
    mockPackageRootDir.mockReturnValue('/empty/root');
    mockExistsSync.mockReturnValue(true);

    const result = composerVendorDir({});

    expect(result).toBe('/empty/root/vendor');
  });

  it('should return string type', () => {
    mockPackageRootDir.mockReturnValue('/test/root');
    mockExistsSync.mockReturnValue(true);

    const result = composerVendorDir({ checkExistence: false });

    expect(typeof result).toBe('string');
  });
});
