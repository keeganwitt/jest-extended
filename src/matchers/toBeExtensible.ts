export function toBeExtensible(actual: unknown) {
  // @ts-expect-error OK to have implicit any for this.utils
  const { matcherHint, printExpected, printReceived } = this.utils;

  const pass = Object.isExtensible(actual);

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('.not.toBeExtensible', 'received', '') +
          '\n\n' +
          'Expected value to not be extensible received:\n' +
          `  ${printExpected(actual)}\n`
        : matcherHint('.toBeExtensible', 'received', '') +
          '\n\n' +
          'Expected value to be extensible received:\n' +
          `  ${printReceived(actual)}`,
  };
}
