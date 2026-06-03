import * as matcher from 'src/matchers/toInclude';

expect.extend(matcher);

const data = 'hello world';

describe('.toInclude', () => {
  test('passes when a string has a given substring', () => {
    expect(data).toInclude('ell');
  });

  test('fails when a string does not have a given substring', () => {
    expect(() => expect(data).toInclude('bob')).toThrowErrorMatchingSnapshot();
  });

  test('fails when given a number', () => {
    // @ts-expect-error OK for testing
    expect(() => expect(123).toInclude('123')).toThrowErrorMatchingSnapshot();
  });

  test('fails when given null', () => {
    // @ts-expect-error OK for testing
    expect(() => expect(null).toInclude('null')).toThrowErrorMatchingSnapshot();
  });

  describe('.not.toInclude', () => {
    test('passes when a string does not have a given substring', () => {
      expect(data).not.toInclude('bob');
    });

    test('fails when a string does have a given substring', () => {
      expect(() => expect(data).not.toInclude('ell')).toThrowErrorMatchingSnapshot();
    });

    test('passes when given a non-string', () => {
      // @ts-expect-error OK for testing
      expect(123).not.toInclude('123');
      // @ts-expect-error OK for testing
      expect(null).not.toInclude('null');
    });
  });
});
