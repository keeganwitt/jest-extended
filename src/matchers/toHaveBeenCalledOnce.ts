import { isJestMockOrSpy, mockCheckFailMessage } from 'src/utils';

export function toHaveBeenCalledOnce(actual: unknown) {
  // @ts-expect-error OK to have implicit any for this.utils
  const { printReceived, matcherHint } = this.utils;

  if (!isJestMockOrSpy(actual)) {
    // @ts-expect-error OK to have implicit any for this.utils
    return { pass: false, message: mockCheckFailMessage(this.utils, '.toHaveBeenCalledOnce', actual, true) };
  }

  // @ts-expect-error isJestMockOrSpy provides the type check
  const pass = actual.mock.calls.length === 1;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('.not.toHaveBeenCalledOnce') +
          '\n\n' +
          'Expected mock function to have been called any amount of times but one, but it was called exactly once.'
        : matcherHint('.toHaveBeenCalledOnce') +
          '\n\n' +
          'Expected mock function to have been called exactly once, but it was called:\n' +
          // @ts-expect-error isJestMockOrSpy provides the type check
          `  ${printReceived(actual.mock.calls.length)} times`,
    actual: actual,
  };
}
