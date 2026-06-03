import { containsEntry } from '../utils';

export function toIncludeSamePartialMembers<E = unknown>(actual: unknown, expected: E) {
  // @ts-expect-error OK to have implicit any for this.utils
  const { printReceived, printExpected, matcherHint } = this.utils;

  // @ts-expect-error OK to have implicit any for this.equals
  const pass = predicate((a, b) => this.equals(a, b, this.customTesters), actual, expected);

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('.not.toIncludeSamePartialMembers') +
          '\n\n' +
          'Expected list to not exactly match the partial members of:\n' +
          `  ${printExpected(expected)}\n` +
          'Received:\n' +
          `  ${printReceived(actual)}`
        : matcherHint('.toIncludeSamePartialMembers') +
          '\n\n' +
          'Expected list to have the following partial members and no more:\n' +
          `  ${printExpected(expected)}\n` +
          'Received:\n' +
          `  ${printReceived(actual)}`,
  };
}

const predicate = (equals: any, actual: unknown, expected: any) => {
  if (!Array.isArray(actual) || !Array.isArray(expected) || actual.length !== expected.length) {
    return false;
  }

  const remaining = [...actual];
  for (const expectedPartial of expected) {
    const entries = Object.entries(expectedPartial);
    const index = remaining.findIndex((actualValue: any) =>
      entries.every(entry => containsEntry(equals, actualValue, entry)),
    );

    if (index === -1) {
      return false;
    }

    remaining.splice(index, 1);
  }

  return true;
};
