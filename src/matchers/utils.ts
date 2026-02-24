export const dateMatcher = (
  context: any,
  matcherName: string,
  predicate: (actual: Date) => boolean,
  actual: unknown,
  description: string,
) => {
  const { printReceived, matcherHint } = context.utils;
  const pass = actual instanceof Date && predicate(actual);
  return {
    pass,
    message: () =>
      pass
        ? matcherHint(`.not.${matcherName}`, 'received', '') +
          '\n\n' +
          `Expected date to be ${description} but received:\n` +
          `  ${printReceived(actual)}`
        : matcherHint(`.${matcherName}`, 'received', '') +
          '\n\n' +
          `Expected date to be ${description} but received:\n` +
          `  ${printReceived(actual)}`,
  };
};
