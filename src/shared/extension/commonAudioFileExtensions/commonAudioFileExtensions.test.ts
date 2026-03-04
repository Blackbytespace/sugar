import { describe, it, expect } from 'vitest';
import commonAudioFileExtensions from './commonAudioFileExtensions.js';

describe('commonAudioFileExtensions', () => {
  it('should return array of audio extensions', () => {
    const result = commonAudioFileExtensions();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toContain('mp3');
    expect(result).toContain('wav');
  });

  it('should add dots when dot=true', () => {
    const result = commonAudioFileExtensions({ dot: true });
    expect(result[0]).toMatch('.');
  });

  it('should exclude specified extensions', () => {
    const result = commonAudioFileExtensions({ exclude: ['mp3'] });
    expect(result).not.toContain('mp3');
  });

  it('should include extended formats when extended=true', () => {
    const basic = commonAudioFileExtensions();
    const extended = commonAudioFileExtensions({ extended: true });
    expect(extended.length).toBeGreaterThan(basic.length);
  });
});