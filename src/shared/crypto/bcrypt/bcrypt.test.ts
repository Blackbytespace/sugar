import bcryptjs from 'bcryptjs';
import bcrypt from '../bcrypt/bcrypt.js';

describe('shared.crypto.bcrypt', () => {
  test('encrypt returns a valid bcrypt hash', () => {
    const hash = bcrypt.encrypt('hello world');
    expect(typeof hash).toBe('string');
    expect(hash.startsWith('$2')).toBe(true);
  });

  test('encrypt produces a hash that verifies against the original message', () => {
    const message = 'hello world';
    const hash = bcrypt.encrypt(message);
    expect(bcryptjs.compareSync(message, hash)).toBe(true);
  });

  test('encrypt produces different hashes for the same input (random salt)', () => {
    const hash1 = bcrypt.encrypt('hello world');
    const hash2 = bcrypt.encrypt('hello world');
    expect(hash1).not.toBe(hash2);
  });

  test('encrypt coerces non-string input', () => {
    const hash = bcrypt.encrypt(12345);
    expect(bcryptjs.compareSync('12345', hash)).toBe(true);
  });

  test('encrypt respects custom saltRounds', () => {
    const hash = bcrypt.encrypt('hello world', 8);
    const cost = parseInt(hash.split('$')[2], 10);
    expect(cost).toBe(8);
  });
});
