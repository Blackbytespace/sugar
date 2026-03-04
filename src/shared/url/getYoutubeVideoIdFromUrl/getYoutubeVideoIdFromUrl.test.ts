import { test, expect } from 'vitest';
import getYoutubeVideoIdFromUrl from './getYoutubeVideoIdFromUrl';

test('getYoutubeVideoIdFromUrl', () => {
  // Test standard YouTube watch URLs
  expect(
    getYoutubeVideoIdFromUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
  ).toBe('dQw4w9WgXcQ');
  expect(
    getYoutubeVideoIdFromUrl('http://www.youtube.com/watch?v=dQw4w9WgXcQ'),
  ).toBe('dQw4w9WgXcQ');
  expect(
    getYoutubeVideoIdFromUrl('https://youtube.com/watch?v=dQw4w9WgXcQ'),
  ).toBe('dQw4w9WgXcQ');

  // Test YouTube short URLs (youtu.be)
  expect(getYoutubeVideoIdFromUrl('https://youtu.be/dQw4w9WgXcQ')).toBe(
    'dQw4w9WgXcQ',
  );
  expect(getYoutubeVideoIdFromUrl('http://youtu.be/dQw4w9WgXcQ')).toBe(
    'dQw4w9WgXcQ',
  );

  // Test YouTube embed URLs
  expect(
    getYoutubeVideoIdFromUrl('https://www.youtube.com/embed/dQw4w9WgXcQ'),
  ).toBe('dQw4w9WgXcQ');
  expect(
    getYoutubeVideoIdFromUrl('https://youtube.com/embed/dQw4w9WgXcQ'),
  ).toBe('dQw4w9WgXcQ');

  // Test YouTube URLs with additional parameters
  expect(
    getYoutubeVideoIdFromUrl(
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30s',
    ),
  ).toBe('dQw4w9WgXcQ');
  expect(getYoutubeVideoIdFromUrl('https://youtu.be/dQw4w9WgXcQ?t=30')).toBe(
    'dQw4w9WgXcQ',
  );

  // Test YouTube user channel URLs with video (v/ pattern)
  expect(
    getYoutubeVideoIdFromUrl('https://www.youtube.com/v/dQw4w9WgXcQ'),
  ).toBe('dQw4w9WgXcQ');

  // Test invalid URLs should return null
  expect(getYoutubeVideoIdFromUrl('https://www.google.com')).toBe(null);
  expect(getYoutubeVideoIdFromUrl('https://www.vimeo.com/123456')).toBe(null);
  expect(getYoutubeVideoIdFromUrl('not-a-url')).toBe(null);
  expect(getYoutubeVideoIdFromUrl('')).toBe(null);

  // Test YouTube URLs without video ID should return null
  expect(getYoutubeVideoIdFromUrl('https://www.youtube.com')).toBe(null);
  expect(getYoutubeVideoIdFromUrl('https://www.youtube.com/watch')).toBe(null);
  expect(getYoutubeVideoIdFromUrl('https://www.youtube.com/watch?v=')).toBe(
    null,
  );

  // Test video IDs with incorrect length (must be exactly 11 characters)
  expect(
    getYoutubeVideoIdFromUrl('https://www.youtube.com/watch?v=shortid'),
  ).toBe(null); // 7 chars
  expect(
    getYoutubeVideoIdFromUrl(
      'https://www.youtube.com/watch?v=toolongvideoid123',
    ),
  ).toBe(null); // 17 chars

  // Test edge cases with special characters in video ID
  expect(
    getYoutubeVideoIdFromUrl('https://www.youtube.com/watch?v=Ab-_Cd123Ef'),
  ).toBe('Ab-_Cd123Ef'); // valid with hyphens/underscores

  // Test URLs with fragments
  expect(
    getYoutubeVideoIdFromUrl(
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ#t=30s',
    ),
  ).toBe('dQw4w9WgXcQ');
});
