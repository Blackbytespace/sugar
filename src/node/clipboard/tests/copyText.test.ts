import { wait } from '@blackbyte/sugar/datetime';
import copyText from '../copyText';
import readText from '../readText';

describe('copyText', () => {
  it('should copy the text and get it back correctly', async () => {
    const text = 'Hello world';
    copyText(text);
    await wait(); // Wait for the clipboard to update
    expect(readText()).toBe(text);
  });
});
