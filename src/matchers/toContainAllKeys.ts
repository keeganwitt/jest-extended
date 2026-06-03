import { contains } from 'src/utils';

export function toContainAllKeys<E = unknown>(actual: unknown, expected: readonly (keyof E | string)[]) {
  // @ts-expect-error OK to have implicit any for this.utils
  const { printExpected, printReceived, matcherHint } = this.utils;

  let pass = false;
  let objectKeys: string[] = [];
  if (typeof actual === 'object' && actual !== null && !Array.isArray(actual)) {
    objectKeys = Object.keys(actual as Record<string, unknown>);
    // @ts-expect-error OK to have implicit any for this.equals
    const equals = (a, b) => this.equals(a, b, this.customTesters);
    pass =
      objectKeys.length === expected.length &&
      expected.every(key => contains(equals, objectKeys, key));
  }

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('.not.toContainAllKeys') +
          '\n\n' +
          'Expected object to not contain all keys:\n' +
          `  ${printExpected(expected)}\n` +
          'Received:\n' +
          `  ${printReceived(objectKeys)}`
        : matcherHint('.toContainAllKeys') +
          '\n\n' +
          'Expected object to contain all keys:\n' +
          `  ${printExpected(expected)}\n` +
          'Received:\n' +
          `  ${printReceived(objectKeys)}`,
  };
}
