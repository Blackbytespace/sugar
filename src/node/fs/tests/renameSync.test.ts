import renameSync from '../renameSync';

describe('sugar.node.fs.renameSync', () => {
  it('Should rename a simple (file.php) file name correctly', () => {
    const newPath = renameSync('/my/cool/file.php', 'newName', {
      dry: true,
    });
    expect(newPath).toBe('/my/cool/newName.php');
  });
  it('Should rename a complexe (file.blade.php) file name correctly', () => {
    const newPath = renameSync('/my/cool/file.blade.php', 'newName', {
      dry: true,
    });
    expect(newPath).toBe('/my/cool/newName.blade.php');
  });
  it('Should rename a simple (file.php) file name correctly with a new extension', () => {
    const newPath = renameSync('/my/cool/file.php', 'newName.txt', {
      dry: true,
    });
    expect(newPath).toBe('/my/cool/newName.txt');
  });
  it('Should rename a complexe (file.blade.php) file name correctly with a new extension', () => {
    const newPath = renameSync('/my/cool/file.blade.php', 'newName.txt', {
      dry: true,
    });
    expect(newPath).toBe('/my/cool/newName.txt');
  });
});
