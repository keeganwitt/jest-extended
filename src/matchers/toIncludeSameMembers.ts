export function toIncludeSameMembers<E = unknown>(actual: unknown, expected: readonly E[]) {
  // @ts-expect-error OK to have implicit any for this.utils
  const { printReceived, printExpected, matcherHint } = this.utils;

  const pass =
    Array.isArray(actual) &&
    Array.isArray(expected) &&
    // @ts-expect-error OK to have implicit any for this.equals
    predicate((a, b) => this.equals(a, b, this.customTesters), actual, expected);

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('.not.toIncludeSameMembers') +
          '\n\n' +
          'Expected list to not exactly match the members of:\n' +
          `  ${printExpected(expected)}\n` +
          'Received:\n' +
          `  ${printReceived(actual)}`
        : matcherHint('.toIncludeSameMembers') +
          '\n\n' +
          'Expected list to have the following members and no more:\n' +
          `  ${printExpected(expected)}\n` +
          'Received:\n' +
          `  ${printReceived(actual)}`,
  };
}

const predicate = (equals: any, actual: any, expected: any) => {
  if (!Array.isArray(actual) || !Array.isArray(expected) || actual.length !== expected.length) {
    return false;
  }

  const remaining = [...actual];
  for (const secondValue of expected) {
    const index = remaining.findIndex((firstValue: any) => equals(secondValue, firstValue));

    if (index === -1) {
      return false;
    }

    remaining.splice(index, 1);
  }

  return remaining.length === 0;
};
