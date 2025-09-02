import parse from '../parse.ts';

describe('sugar.shared.string.parse', () => {
  it('Should return a simple string as a string', () => {
    const str = 'Hello world';
    const res = parse(str);
    expect(res).toEqual(str);
  });
  it('Should parse an integer correctly', () => {
    const str = '10';
    const res = parse(str);
    expect(res).toEqual(10);
  });
  it('Should parse a float correctly', () => {
    const str = '10.12';
    const res = parse(str);
    expect(res).toEqual(10.12);
  });
  it('Should parse "null" correctly', () => {
    const str = 'null';
    const res = parse(str);
    expect(res).toEqual(null);
  });
  it('Should parse "NULL" correctly', () => {
    const str = 'NULL';
    const res = parse(str);
    expect(res).toEqual(null);
  });
  it('Should parse "undefined" correctly', () => {
    const str = 'undefined';
    const res = parse(str);
    expect(res).toEqual(undefined);
  });
  it('Should parse "UNDEFINED" correctly', () => {
    const str = 'UNDEFINED';
    const res = parse(str);
    expect(res).toEqual(undefined);
  });
  it('Should parse "true" correctly', () => {
    const str = 'true';
    const res = parse(str);
    expect(res).toEqual(true);
  });
  it('Should parse "TRUE" correctly', () => {
    const str = 'TRUE';
    const res = parse(str);
    expect(res).toEqual(true);
  });
  it('Should parse "false" correctly', () => {
    const str = 'false';
    const res = parse(str);
    expect(res).toEqual(false);
  });
  it('Should parse "FALSE" correctly', () => {
    const str = 'FALSE';
    const res = parse(str);
    expect(res).toEqual(false);
  });
  it('Should parse a valid date correctly', () => {
    const str =
      'Thu May 08 2025 11:07:48 GMT+0200 (Central European Summer Time)';
    const res = parse(str);
    expect(res).toBeInstanceOf(Date);
  });
  it('Should parse an invalid date correctly', () => {
    const str =
      'Thu May 08 20wa25 11:07:48 GMT+0200 (Central European Summer Time)';
    const res = parse(str);
    expect(res).toEqual(
      'Thu May 08 20wa25 11:07:48 GMT+0200 (Central European Summer Time)',
    );
  });
  it('Should parse a valid json correctly', () => {
    const str = '{"hello":"world","foo":"bar","number":10,"float":10.12}';
    const res = parse(str);
    expect(res).toEqual({
      hello: 'world',
      foo: 'bar',
      number: 10,
      float: 10.12,
    });
  });
  it('Should parse an invalid json correctly', () => {
    const str = '{"hello":-"world","foo":"bar","number":10,"float":10.12}';
    const res = parse(str);
    expect(res).toEqual(
      '{"hello":-"world","foo":"bar","number":10,"float":10.12}',
    );
  });
});
