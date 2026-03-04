import { test, expect } from 'vitest';
import formatPackageJson from './formatPackageJson';

test('formatPackageJson', () => {
  // Basic author string transformation
  const pkg1 = {
    author:
      'Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)',
    name: 'test-package',
    version: '1.0.0',
  };
  const result1 = formatPackageJson(pkg1);
  expect(result1.author).toEqual({
    name: 'Olivier Bossel',
    email: 'olivier.bossel@gmail.com',
    url: 'https://blackbyte.space',
  });
  expect(result1.name).toBe('test-package'); // other props unchanged
  expect(result1.version).toBe('1.0.0');

  // Author already as object (should remain unchanged)
  const pkg2 = {
    author: {
      name: 'John Doe',
      email: 'john@example.com',
      url: 'https://johndoe.com',
    },
  };
  const result2 = formatPackageJson(pkg2);
  expect(result2.author).toEqual({
    name: 'John Doe',
    email: 'john@example.com',
    url: 'https://johndoe.com',
  });

  // Author as array of strings
  const pkg3 = {
    author: [
      'Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)',
      'John Doe <john@example.com> (https://johndoe.com)',
    ],
  };
  const result3 = formatPackageJson(pkg3);
  expect(result3.author).toEqual([
    {
      name: 'Olivier Bossel',
      email: 'olivier.bossel@gmail.com',
      url: 'https://blackbyte.space',
    },
    {
      name: 'John Doe',
      email: 'john@example.com',
      url: 'https://johndoe.com',
    },
  ]);

  // Author as mixed array (strings and objects)
  const pkg4 = {
    author: [
      'Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)',
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        url: 'https://janesmith.com',
      },
    ],
  };
  const result4 = formatPackageJson(pkg4);
  expect(result4.author[0]).toEqual({
    name: 'Olivier Bossel',
    email: 'olivier.bossel@gmail.com',
    url: 'https://blackbyte.space',
  });
  expect(result4.author[1]).toEqual({
    name: 'Jane Smith',
    email: 'jane@example.com',
    url: 'https://janesmith.com',
  });

  // Contributors string transformation
  const pkg5 = {
    contributors: 'John Doe <john@example.com> (https://johndoe.com)',
  };
  const result5 = formatPackageJson(pkg5);
  expect(result5.contributors).toEqual({
    name: 'John Doe',
    email: 'john@example.com',
    url: 'https://johndoe.com',
  });

  // Contributors as array of strings
  const pkg6 = {
    contributors: [
      'John Doe <john@example.com> (https://johndoe.com)',
      'Jane Smith <jane@example.com> (https://janesmith.com)',
    ],
  };
  const result6 = formatPackageJson(pkg6);
  expect(result6.contributors).toEqual([
    {
      name: 'John Doe',
      email: 'john@example.com',
      url: 'https://johndoe.com',
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      url: 'https://janesmith.com',
    },
  ]);

  // Contributors as mixed array
  const pkg7 = {
    contributors: [
      'John Doe <john@example.com> (https://johndoe.com)',
      {
        name: 'Existing Object',
        email: 'existing@example.com',
        url: 'https://existing.com',
      },
    ],
  };
  const result7 = formatPackageJson(pkg7);
  expect(result7.contributors[0]).toEqual({
    name: 'John Doe',
    email: 'john@example.com',
    url: 'https://johndoe.com',
  });
  expect(result7.contributors[1]).toEqual({
    name: 'Existing Object',
    email: 'existing@example.com',
    url: 'https://existing.com',
  });

  // Package with no author or contributors
  const pkg8 = {
    name: 'test-package',
    version: '1.0.0',
  };
  const result8 = formatPackageJson(pkg8);
  expect(result8).toEqual({
    name: 'test-package',
    version: '1.0.0',
  });

  // Package with both author and contributors
  const pkg9 = {
    name: 'complex-package',
    author: 'Main Author <main@example.com> (https://main.com)',
    contributors: [
      'Contributor 1 <contrib1@example.com> (https://contrib1.com)',
      'Contributor 2 <contrib2@example.com> (https://contrib2.com)',
    ],
  };
  const result9 = formatPackageJson(pkg9);
  expect(result9.author).toEqual({
    name: 'Main Author',
    email: 'main@example.com',
    url: 'https://main.com',
  });
  expect(result9.contributors).toEqual([
    {
      name: 'Contributor 1',
      email: 'contrib1@example.com',
      url: 'https://contrib1.com',
    },
    {
      name: 'Contributor 2',
      email: 'contrib2@example.com',
      url: 'https://contrib2.com',
    },
  ]);
  expect(result9.name).toBe('complex-package');
});
