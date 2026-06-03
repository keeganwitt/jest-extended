import { containsEntry } from 'src/utils';

export function toContainEntries<E = unknown>(actual: unknown, expected: readonly (readonly [keyof E, E[keyof E]])[]) {
  // @ts-expect-error OK to have implicit any for this.utils
  const { printReceived, printExpected, matcherHint } = this.utils;

  const pass = expected.every(entry =>
    containsEntry((a, b) => this.equals(a, b, this.customTesters), actual, entry as unknown as [PropertyKey, unknown]),
  );

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('.not.toContainEntries') +
          '\n\n' +
          'Expected object to not contain all of the given entries:\n' +
          `  ${printExpected(expected)}\n` +
          'Received:\n' +
          `  ${printReceived(actual)}`
        : matcherHint('.toContainEntries') +
          '\n\n' +
          'Expected object to contain all of the given entries:\n' +
          `  ${printExpected(expected)}\n` +
          'Received:\n' +
          `  ${printReceived(actual)}`,
  };
}
