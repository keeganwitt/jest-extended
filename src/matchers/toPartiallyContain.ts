import { containsEntry } from 'src/utils';

export function toPartiallyContain<E = unknown>(this: any, actual: unknown, expected: E) {
  const { printReceived, printExpected, matcherHint } = this.utils;

  let pass = false;
  if (Array.isArray(actual) && typeof expected === 'object' && expected !== null) {
    const equals = (a: any, b: any) => this.equals(a, b, this.customTesters);
    const entries = Object.entries(expected);
    pass = actual.some(value => entries.every(entry => containsEntry(equals, value, entry)));
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
