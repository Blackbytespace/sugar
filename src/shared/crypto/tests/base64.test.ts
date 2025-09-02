import base64 from '../base64.js';

describe('shared.crypto.base64', () => {
  test('Encrypt', () => {
    const res = base64.encrypt('hello world');
    expect(res).toBe('aGVsbG8gd29ybGQ=');
  });
  test('Decrypt', () => {
    const res = base64.decrypt('aGVsbG8gd29ybGQ=');
    expect(res).toBe('hello world');
  });
});
