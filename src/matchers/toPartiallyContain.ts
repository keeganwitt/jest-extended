import { containsEntry } from 'src/utils';

export function toPartiallyContain<E = unknown>(actual: unknown, expected: E) {
  // @ts-expect-error OK to have implicit any for this.utils
  const { printReceived, printExpected, matcherHint } = this.utils;

  let pass = false;
  if (Array.isArray(actual) && typeof expected === 'object' && expected !== null) {
    const entries = Object.entries(expected);
    pass = actual.some(value =>
      entries.every(entry =>
        // @ts-expect-error OK to have implicit any for this.equals
        containsEntry((a, b) => this.equals(a, b, this.customTesters), value, entry),
      ),
    );
  }

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('.not.toPartiallyContain') +
          '\n\n' +
          'Expected array not to partially contain:\n' +
          `  ${printExpected(expected)}\n` +
          'Received:\n' +
          `  ${printReceived(actual)}`
        : matcherHint('.toPartiallyContain') +
          '\n\n' +
          'Expected array to partially contain:\n' +
          `  ${printExpected(expected)}\n` +
          'Received:\n' +
          `  ${printReceived(actual)}`,
  };
}
