import sha256 from '../sha256.js';

describe('shared.crypto.base64', () => {
  test('Encrypt', () => {
    const res = sha256.encrypt('hello world');
    expect(res).toBe(
      'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
    );
  });
  test('Decrypt', () => {
    const res = sha256.decrypt(
      'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
    );
    expect(res).toBe('hello world');
  });
});
