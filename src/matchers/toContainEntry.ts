import { containsEntry } from 'src/utils';

export function toContainEntry<E = unknown>(actual: unknown, expected: readonly [keyof E, E[keyof E]]) {
  // @ts-expect-error OK to have implicit any for this.utils
  const { printReceived, printExpected, matcherHint } = this.utils;

  const pass = containsEntry(
    (a, b) => this.equals(a, b, this.customTesters),
    actual,
    expected as unknown as [PropertyKey, unknown],
  );

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('.not.toContainEntry') +
          '\n\n' +
          'Expected object to not contain entry:\n' +
          `  ${printExpected(expected)}\n` +
          'Received:\n' +
          `  ${printReceived(actual)}`
        : matcherHint('.toContainEntry') +
          '\n\n' +
          'Expected object to contain entry:\n' +
          `  ${printExpected(expected)}\n` +
          'Received:\n' +
          `  ${printReceived(actual)}`,
  };
}
