import * as matcher from 'src/matchers/toContainKeys';

expect.extend(matcher);

const data = { a: 'foo', b: 'bar', c: 'baz' };

describe('.toContainKeys', () => {
  test('passes when object contains all keys', () => {
    expect(data).toContainKeys(['b', 'c']);
  });

  test('fails when object does not contain all keys', () => {
    expect(() => expect(data).toContainKeys(['a', 'd'])).toThrowErrorMatchingSnapshot();
  });

  test('fails when keys are in the prototype', () => {
    const proto = { protoKey: 'protoValue' };
    const obj = Object.create(proto);
    obj.ownKey = 'ownValue';

    expect(() => expect(obj).toContainKeys(['protoKey'])).toThrowErrorMatchingSnapshot();
    expect(() => expect(obj).toContainKeys(['ownKey', 'protoKey'])).toThrowErrorMatchingSnapshot();
  });

  test('fails when actual is not an object', () => {
    expect(() => expect(null).toContainKeys(['a'])).toThrowErrorMatchingSnapshot();
    expect(() => expect(undefined).toContainKeys(['a'])).toThrowErrorMatchingSnapshot();
  });
});

describe('.not.toContainKeys', () => {
  test('passes when object does not contain all keys', () => {
    expect(data).not.toContainKeys(['d']);
  });

  test('passes when keys are in the prototype', () => {
    const proto = { protoKey: 'protoValue' };
    const obj = Object.create(proto);
    obj.ownKey = 'ownValue';

    expect(obj).not.toContainKeys(['protoKey']);
  });

  test('fails when object contains all keys', () => {
    expect(() => expect(data).not.toContainKeys(['a', 'b', 'c'])).toThrowErrorMatchingSnapshot();
  });
});
