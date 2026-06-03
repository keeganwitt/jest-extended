import * as matcher from 'src/matchers/toBeEmptyObject';

expect.extend(matcher);

describe('.toBeEmptyObject', () => {
  test('passes when given an empty object', () => {
    expect({}).toBeEmptyObject();
  });

  test('passes when given an object with no prototype', () => {
    expect(Object.create(null)).toBeEmptyObject();
  });

  test('passes when given an empty Set', () => {
    expect(new Set()).toBeEmptyObject();
  });

  test('passes when given an empty Map', () => {
    expect(new Map()).toBeEmptyObject();
  });

  test('passes when given an empty class instance', () => {
    class Foo {}
    expect(new Foo()).toBeEmptyObject();
  });

  test('passes when given a Date (as it has no enumerable properties and is not an iterable)', () => {
    expect(new Date()).toBeEmptyObject();
  });

  test('fails when not given an empty object', () => {
    expect(() => expect({ property1: 'something' }).toBeEmptyObject()).toThrowErrorMatchingSnapshot();
  });

  test('fails when given a non-empty Set', () => {
    expect(() => expect(new Set([1])).toBeEmptyObject()).toThrowErrorMatchingSnapshot();
  });

  test('fails when given a non-empty Map', () => {
    expect(() => expect(new Map([['a', 1]])).toBeEmptyObject()).toThrowErrorMatchingSnapshot();
  });

  test('fails when not given an object', () => {
    expect(() => expect(null).toBeEmptyObject()).toThrowErrorMatchingSnapshot();
    expect(() => expect([42]).toBeEmptyObject()).toThrowErrorMatchingSnapshot();
    expect(() => expect(42).toBeEmptyObject()).toThrowErrorMatchingSnapshot();
  });
});

describe('.not.toBeEmptyObject', () => {
  test('passes when not given an empty object', () => {
    expect({ property1: 'something' }).not.toBeEmptyObject();
  });

  test('passes when given a non-empty Set', () => {
    expect(new Set([1])).not.toBeEmptyObject();
  });

  test('passes when given a non-empty Map', () => {
    expect(new Map([['a', 1]])).not.toBeEmptyObject();
  });

  test('fails when given an empty object', () => {
    expect(() => expect({}).not.toBeEmptyObject()).toThrowErrorMatchingSnapshot();
  });

  test('fails when given an empty Set', () => {
    expect(() => expect(new Set()).not.toBeEmptyObject()).toThrowErrorMatchingSnapshot();
  });

  test('fails when given an empty Map', () => {
    expect(() => expect(new Map()).not.toBeEmptyObject()).toThrowErrorMatchingSnapshot();
  });

  test('passes when not given an object', () => {
    expect(() => expect(null).not.toBeEmptyObject());
    expect(() => expect([42]).not.toBeEmptyObject());
    expect(() => expect(42).not.toBeEmptyObject());
  });
});
