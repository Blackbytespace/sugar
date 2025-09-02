import composerJsonSync from '../composerJsonSync';

describe('sugar.node.composer.composerJsonSync', () => {
  it('should return the composer.json correctly for the current package "."', () => {
    const json = composerJsonSync('.');
    expect(json.name).toBe('blackbyte/sugar');
  });
  it('should return the composer.json correctly for the "psr/log" package', () => {
    const json = composerJsonSync('psr/log');
    expect(json.name).toBe('psr/log');
  });
});
