import packageDir from '../packageDir';

describe('sugar.node.package.packageDir', () => {
  it('should return the current package package.json path', () => {
    const path = packageDir('.');
    expect(path.includes('packages/sugar')).toBe(true);
  });
  it('should throw an error if the requested package does not exists', () => {
    expect(() => {
      packageDir('ewfwef/wefwef');
    }).toThrow();
  });
  it('should not throw an error if the requested package does not exists and that we have setted the checkExistance setting to false', () => {
    expect(() => {
      packageDir('ewfwef/wefwef', {
        checkExistence: false,
      });
    }).not.toThrow();
  });
  //   it('should return the correct package path for the sugar package', () => {
  //     const path = packageDir('blackbyte/sugar', {
  //       checkExistence: false,
  //     });
  //     expect(path.includes('sugar/vendor/blackbyte/sugar')).toBe(true);
  //   });
});
