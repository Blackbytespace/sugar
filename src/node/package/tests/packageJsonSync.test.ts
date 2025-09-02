import packageJsonSync from '../packageJsonSync';

describe('sugar.node.package.packageJsonSync', () => {
  it('should return the package.json correctly for the current package "."', () => {
    const json = packageJsonSync('.');
    expect(json.name).toBe('@blackbyte/sugar');
  });
  //   it('should return the composer.json correctly for the "psr/log" package', () => {
  //     const json = packageJsonSync('psr/log');
  //     expect(json.name).toBe('psr/log');
  //   });
});
