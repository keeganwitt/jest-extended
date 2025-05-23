export function toBeDateString(actual: unknown) {
  // @ts-expect-error OK to have implicit any for this.utils
  const { matcherHint, printReceived } = this.utils;

  const pass = typeof actual === 'string' && !isNaN(Date.parse(actual));

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('.not.toBeDateString', 'received', '') +
          '\n\n' +
          'Expected value to not be a date string received:\n' +
          `  ${printReceived(actual)}`
        : matcherHint('.toBeDateString', 'received', '') +
          '\n\n' +
          'Expected value to be a date string received:\n' +
          `  ${printReceived(actual)}`,
  };
}
