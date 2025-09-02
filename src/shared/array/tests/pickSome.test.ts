import pickSome from '../pickSome.js';

describe('shared.array.pickSome', () => {
  it('Should pick some items from the passed array', () => {
    const res = pickSome(['hello', 'world', 'test', 'plop', 'coco'], 1, 2);
    expect(res.length).toBeGreaterThanOrEqual(1);
    expect(res.length).toBeLessThanOrEqual(2);
  });
});
