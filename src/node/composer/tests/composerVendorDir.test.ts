import composerVendorDir from '../composerVendorDir';

describe('sugar.node.composer.composerVendorDir', () => {
  it('should return the correct vendor dirs for the sugar package', () => {
    const path = composerVendorDir({
      monorepo: false,
    });
    expect(path.includes('sugar/vendor')).toBe(true);
  });
});
