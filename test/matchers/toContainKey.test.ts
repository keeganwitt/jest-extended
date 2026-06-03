import * as matcher from 'src/matchers/toContainKey';

expect.extend(matcher);

const data = { hello: 'world' };

describe('.toContainKey', () => {
  test('passes when given object contains key', () => {
    expect(data).toContainKey('hello');
  });

  test('fails when given object does not contain key', () => {
    expect(() => expect(data).toContainKey('missing')).toThrowErrorMatchingSnapshot();
  });

  test('fails when key is in the prototype', () => {
    const proto = { protoKey: 'protoValue' };
    const obj = Object.create(proto);
    obj.ownKey = 'ownValue';

    expect(() => expect(obj).toContainKey('protoKey')).toThrowErrorMatchingSnapshot();
  });

  test('fails when actual is not an object', () => {
    expect(() => expect(null).toContainKey('hello')).toThrowErrorMatchingSnapshot();
    expect(() => expect(undefined).toContainKey('hello')).toThrowErrorMatchingSnapshot();
    expect(() => expect(42).toContainKey('hello')).toThrowErrorMatchingSnapshot();
  });
});

describe('.not.toContainKey', () => {
  test('passes when given object does not contain key', () => {
    expect(data).not.toContainKey('missing');
  });

  test('passes when key is in the prototype', () => {
    const proto = { protoKey: 'protoValue' };
    const obj = Object.create(proto);
    obj.ownKey = 'ownValue';

    expect(obj).not.toContainKey('protoKey');
  });

  test('fails when given object contains key', () => {
    expect(() => expect(data).not.toContainKey('hello')).toThrowErrorMatchingSnapshot();
  });

  test('passes when actual is not an object', () => {
    expect(() => expect(null).not.toContainKey('hello'));
    expect(() => expect(undefined).not.toContainKey('hello'));
    expect(() => expect(42).not.toContainKey('hello'));
  });
});
