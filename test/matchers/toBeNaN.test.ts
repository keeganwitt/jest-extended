import * as matcher from 'src/matchers/toBeNaN';

expect.extend(matcher);

describe('.toBeNaN', () => {
  test('passes when given a non-number', () => {
    expect({}).toBeNaN();
  });

  test('passes when given a string that is NaN', () => {
    expect('foo').toBeNaN();
  });

  test('fails when given a number', () => {
    expect(() => expect(3).toBeNaN()).toThrowErrorMatchingSnapshot();
  });
});

describe('.not.toBeNaN', () => {
  test.each([[0], [1], [300], [10.5], [-50], ['123'], [''], [' ']])('passes when given a value that is not NaN: %s', given => {
    expect(given).not.toBeNaN();
  });

  test('fails when given a non-number', () => {
    expect(() => expect(undefined).not.toBeNaN()).toThrowErrorMatchingSnapshot();
  });
});
