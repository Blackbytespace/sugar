import pickRandom from '../pickRandom.js';

describe('shared.array.pickRandom', () => {
  it('Should pick a random item from the passed array', () => {
    const res = pickRandom(['hello', 'world', 'test', 'plop', 'coco'], 1);
    expect(typeof res).toBe('string');
  });
  it('Should pick some random items from the passed array', () => {
    const res = pickRandom(['hello', 'world', 'test', 'plop', 'coco'], 3);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBe(3);
  });
});
