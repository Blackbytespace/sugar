import copyText from '../copyText';
import readText from '../readText';

describe('copyText', () => {
  it('should copy the text and get it back correctly', () => {
    const text = 'Hello world';
    copyText(text);
    expect(readText()).toBe(text);
  });
});
