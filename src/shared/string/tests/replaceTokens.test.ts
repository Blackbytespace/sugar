import replaceTokens, { TReplaceTokensSettings } from '../replaceTokens';

describe('replaceTokens', () => {
  it('should replace tokens in a string', () => {
    const result = replaceTokens('hello [world]', { world: 'Coco' });
    expect(result).toBe('hello Coco');
  });

  it('should use the provided regexp to match tokens', () => {
    const settings: TReplaceTokensSettings = {
      regexp: '\\{([a-zA-Z0-9-_]+)\\}',
    };
    const result = replaceTokens('hello {world}', { world: 'Coco' }, settings);
    expect(result).toBe('hello Coco');
  });

  it('should remove undefined tokens when stripUndefined is true', () => {
    const settings: TReplaceTokensSettings = { stripUndefined: true };
    const result = replaceTokens(
      'hello [world] [foo]',
      { world: 'Coco' },
      settings,
    );
    expect(result).toBe('hello Coco ');
  });

  it('should leave undefined tokens when stripUndefined is false', () => {
    const settings: TReplaceTokensSettings = { stripUndefined: false };
    const result = replaceTokens(
      'hello [world] [foo]',
      { world: 'Coco' },
      settings,
    );
    expect(result).toBe('hello Coco [foo]');
  });
});
