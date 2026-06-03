import { isEmptyIterable } from '../utils';

export function toBeEmptyObject(actual: unknown) {
  // @ts-expect-error OK to have implicit any for this.utils
  const { printReceived, matcherHint } = this.utils;

  const isObject = typeof actual === 'object' && actual !== null && !Array.isArray(actual);
  const isIterable = actual != null && typeof (actual as any)[Symbol.iterator] === 'function';

  const pass = isObject && Object.keys(actual as object).length === 0 && (!isIterable || isEmptyIterable(actual));

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('.not.toBeEmptyObject', 'received', '') +
          '\n\n' +
          'Expected value to not be an empty object, received:\n' +
          `  ${printReceived(actual)}`
        : matcherHint('.toBeEmptyObject', 'received', '') +
          '\n\n' +
          'Expected value to be an empty object, received:\n' +
          `  ${printReceived(actual)}`,
  };
}
