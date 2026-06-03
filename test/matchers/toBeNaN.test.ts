import * as matcher from 'src/matchers/toBeNaN';

expect.extend(matcher);

describe('.toBeNaN', () => {
  test('passes when given a non-number', () => {
    expect({}).toBeNaN();
  });

  test('fails when given a number', () => {
    expect(() => expect(3).toBeNaN()).toThrowErrorMatchingSnapshot();
  });

  test('fails when given null', () => {
    expect(() => expect(null).toBeNaN()).toThrowErrorMatchingSnapshot();
  });
});

describe('.not.toBeNaN', () => {
  test.each([[0], [1], [300], [10.5], [-50], [null]])('passes when given a number: %s', given => {
    expect(given).not.toBeNaN();
  });

  test('fails when given a non-number', () => {
    expect(() => expect(undefined).not.toBeNaN()).toThrowErrorMatchingSnapshot();
  });
});
