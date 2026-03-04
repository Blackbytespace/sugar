import { test, expect } from 'vitest';
import getVimeoVideoIdFromUrl from './getVimeoVideoIdFromUrl';

test('getVimeoVideoIdFromUrl', () => {
  // Test standard Vimeo URLs
  expect(getVimeoVideoIdFromUrl('https://vimeo.com/123456789')).toBe(
    '123456789',
  );
  expect(getVimeoVideoIdFromUrl('http://vimeo.com/123456789')).toBe(
    '123456789',
  );
  expect(getVimeoVideoIdFromUrl('vimeo.com/123456789')).toBe('123456789');

  // Test Vimeo URLs with www
  expect(getVimeoVideoIdFromUrl('https://www.vimeo.com/123456789')).toBe(
    '123456789',
  );
  expect(getVimeoVideoIdFromUrl('http://www.vimeo.com/123456789')).toBe(
    '123456789',
  );

  // Test Vimeo player URLs
  expect(
    getVimeoVideoIdFromUrl('https://player.vimeo.com/video/123456789'),
  ).toBe('123456789');
  expect(
    getVimeoVideoIdFromUrl('http://player.vimeo.com/video/123456789'),
  ).toBe('123456789');
  expect(getVimeoVideoIdFromUrl('player.vimeo.com/video/123456789')).toBe(
    '123456789',
  );

  // Test Vimeo URLs with additional parameters
  expect(getVimeoVideoIdFromUrl('https://vimeo.com/123456789?autoplay=1')).toBe(
    '123456789',
  );
  expect(
    getVimeoVideoIdFromUrl('https://vimeo.com/123456789?color=ffffff'),
  ).toBe('123456789');
  expect(
    getVimeoVideoIdFromUrl(
      'https://player.vimeo.com/video/123456789?title=0&byline=0',
    ),
  ).toBe('123456789');

  // Test with different video ID lengths (6-11 digits according to regex)
  expect(getVimeoVideoIdFromUrl('https://vimeo.com/123456')).toBe('123456'); // 6 digits
  expect(getVimeoVideoIdFromUrl('https://vimeo.com/1234567')).toBe('1234567'); // 7 digits
  expect(getVimeoVideoIdFromUrl('https://vimeo.com/12345678901')).toBe(
    '12345678901',
  ); // 11 digits

  // Test Vimeo URLs with channels/groups paths
  expect(
    getVimeoVideoIdFromUrl('https://vimeo.com/channels/staffpicks/123456789'),
  ).toBe('123456789');
  expect(
    getVimeoVideoIdFromUrl(
      'https://vimeo.com/groups/shortfilms/videos/123456789',
    ),
  ).toBe('123456789');

  // Test invalid URLs should return null
  expect(
    getVimeoVideoIdFromUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
  ).toBe(null);
  expect(getVimeoVideoIdFromUrl('https://www.google.com')).toBe(null);
  expect(getVimeoVideoIdFromUrl('not-a-url')).toBe(null);
  expect(getVimeoVideoIdFromUrl('')).toBe(null);

  // Test Vimeo URLs without video ID
  expect(getVimeoVideoIdFromUrl('https://vimeo.com')).toBe(null);
  expect(getVimeoVideoIdFromUrl('https://vimeo.com/')).toBe(null);
  expect(getVimeoVideoIdFromUrl('https://vimeo.com/channels')).toBe(null);

  // Test video IDs that are too short (less than 6 digits)
  expect(getVimeoVideoIdFromUrl('https://vimeo.com/12345')).toBe(null); // 5 digits
  expect(getVimeoVideoIdFromUrl('https://vimeo.com/1')).toBe(null); // 1 digit

  // Test video IDs that are too long (more than 11 digits)
  // Note: The regex {6,11} matches only the first 11 digits of longer IDs
  expect(getVimeoVideoIdFromUrl('https://vimeo.com/123456789012')).toBe(
    '12345678901',
  ); // Takes first 11 of 12 digits

  // Test URLs with non-numeric video IDs
  expect(getVimeoVideoIdFromUrl('https://vimeo.com/abcdefgh')).toBe(null);
  expect(getVimeoVideoIdFromUrl('https://vimeo.com/123abc789')).toBe(null);

  // Test edge cases with special paths that might contain numbers
  expect(getVimeoVideoIdFromUrl('https://vimeo.com/ondemand/123456789')).toBe(
    '123456789',
  );
});
