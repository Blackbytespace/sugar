import { test, expect } from 'vitest';
import getGlob from './getGlob';

test('getGlob', () => {
  const testObj = {
    user: {
      profile: {
        name: 'John',
        age: 30
      },
      settings: {
        theme: 'dark',
        language: 'en'
      }
    },
    admin: {
      profile: {
        name: 'Admin',
        level: 'super'
      }
    },
    data: {
      items: [
        { id: 1, value: 'item1' },
        { id: 2, value: 'item2' }
      ]
    }
  };

  // Basic glob pattern
  expect(getGlob(testObj, 'user.profile.*')).toEqual({
    user: {
      profile: {
        name: 'John',
        age: 30
      }
    }
  });

  // Wildcard glob pattern
  expect(getGlob(testObj, '*.profile.name')).toEqual({
    user: {
      profile: {
        name: 'John'
      }
    },
    admin: {
      profile: {
        name: 'Admin'
      }
    }
  });

  // Double wildcard pattern
  expect(getGlob(testObj, 'user.*.*')).toEqual({
    user: {
      profile: {
        name: 'John',
        age: 30
      },
      settings: {
        theme: 'dark',
        language: 'en'
      }
    }
  });

  // Note: Array patterns have limitations in the current implementation
  // The flatten/minimatch combination doesn't handle array bracket notation well
  // For array access, consider using getDeep() or direct property access instead

  // Get flattened result
  expect(getGlob(testObj, '*.profile.name', { unflatten: false })).toEqual({
    'user.profile.name': 'John',
    'admin.profile.name': 'Admin'
  });

  // Specific path
  expect(getGlob(testObj, 'user.settings.theme')).toEqual({
    user: {
      settings: {
        theme: 'dark'
      }
    }
  });

  // No matches
  expect(getGlob(testObj, 'nonexistent.*')).toEqual({});

  // Exact match
  expect(getGlob(testObj, 'admin.profile.level')).toEqual({
    admin: {
      profile: {
        level: 'super'
      }
    }
  });
});