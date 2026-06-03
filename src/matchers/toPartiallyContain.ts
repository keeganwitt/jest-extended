import { containsEntry } from 'src/utils';

export function toPartiallyContain<E = unknown>(actual: unknown, expected: E) {
  // @ts-expect-error OK to have implicit any for this.utils
  const { printReceived, printExpected, matcherHint } = this.utils;

  const entries = typeof expected === 'object' && expected !== null ? Object.entries(expected) : [];
  const equals = (a: unknown, b: unknown) =>
    // @ts-expect-error OK to have implicit any for this.equals
    this.equals(a, b, this.customTesters);

  const pass =
    Array.isArray(actual) &&
    typeof expected === 'object' &&
    expected !== null &&
    actual.some(value => entries.every(entry => containsEntry(equals, value, entry)));

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
