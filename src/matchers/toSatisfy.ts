import { validatePredicate } from 'src/utils';

export function toSatisfy<E = any>(actual: E, expected: (x: E) => boolean) {
  // @ts-expect-error OK to have implicit any for this.utils
  const { printReceived, printExpected, matcherHint } = this.utils;

  const failure = validatePredicate(expected, matcherHint('.toSatisfy', 'received', ''));
  if (failure) return failure;

  const pass = expected(actual);

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('.not.toSatisfy', 'received', '') +
          '\n\n' +
          'Expected value to not satisfy:\n' +
          `  ${printExpected(expected)}\n` +
          'Received:\n' +
          `  ${printReceived(actual)}`
        : matcherHint('.toSatisfy', 'received', '') +
          '\n\n' +
          'Expected value to satisfy:\n' +
          `  ${printExpected(expected)}\n` +
          'Received:\n' +
          `  ${printReceived(actual)}`,
  };
}
