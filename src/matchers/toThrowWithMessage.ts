type ErrConstructor =
  | (new (...args: any[]) => { message: string })
  | (abstract new (...args: any[]) => { message: string })
  | ((...args: any[]) => { message: string });

const predicate = (error: unknown, type: ErrConstructor, message: string | RegExp) => {
  if (message instanceof RegExp) {
    return error instanceof (type as any) && message.test((error as any).message);
  }
  return error instanceof (type as any) && (error as any).message === message;
};

const positiveHint = (utils: any) =>
  utils.matcherHint('.toThrowWithMessage', 'function', 'type', { secondArgument: 'message' });

const negativeHint = (utils: any) =>
  utils.matcherHint('.not.toThrowWithMessage', 'function', 'type', { secondArgument: 'message' });

const passMessage = (utils: any, received: unknown, expected: Error) =>
  negativeHint(utils) +
  '\n\n' +
  'Expected not to throw:\n' +
  `  ${utils.printExpected(expected)}\n` +
  'Thrown:\n' +
  `  ${utils.printReceived(received)}\n`;

const failMessage = (utils: any, received: unknown, expected: Error) =>
  positiveHint(utils) +
  '\n\n' +
  'Expected to throw:\n' +
  `  ${utils.printExpected(expected)}\n` +
  'Thrown:\n' +
  `  ${utils.printReceived(received)}\n`;

const getExpectedError = (type: ErrConstructor, message: string | RegExp) => {
  const messageStr = message.toString();
  let expectedError: Error;
  try {
    expectedError = new (type as any)(messageStr);
  } catch {
    const name = type.name;
    expectedError = new Error();
    expectedError.name = name;
    expectedError.message = messageStr;
  }
  return expectedError;
};

export function toThrowWithMessage(
  callbackOrPromiseReturn: (() => void) | unknown,
  type: ErrConstructor,
  message: string | RegExp,
) {
  // @ts-expect-error OK to have implicit any for this.utils
  const utils = this.utils;
  // @ts-expect-error OK to have implicit any for this.promise
  const isFromReject = this && this.promise === 'rejects'; // See https://github.com/facebook/jest/pull/7621#issue-244312550
  if ((!callbackOrPromiseReturn || typeof callbackOrPromiseReturn !== 'function') && !isFromReject) {
    return {
      pass: false,
      message: () =>
        positiveHint(utils) +
        '\n\n' +
        `Received value must be a function but instead "${callbackOrPromiseReturn}" was found`,
    };
  }

  if (!type || typeof type !== 'function') {
    return {
      pass: false,
      message: () => positiveHint(utils) + '\n\n' + `Expected type to be a function but instead "${type}" was found`,
    };
  }

  if (!message) {
    return {
      pass: false,
      message: () => positiveHint(utils) + '\n\n' + ' Message argument is required. ',
    };
  }

  if (typeof message !== 'string' && !(message instanceof RegExp)) {
    return {
      pass: false,
      message: () =>
        positiveHint(utils) +
        '\n\n' +
        'Unexpected argument for message\n' +
        'Expected: "string" or "regexp\n' +
        `Got: "${message}"`,
    };
  }

  let error;
  if (isFromReject) {
    error = callbackOrPromiseReturn;
  } else {
    try {
      (callbackOrPromiseReturn as () => void)();
    } catch (e) {
      error = e;
    }
  }

  if (!error) {
    return {
      pass: false,
      message: () => 'Expected the function to throw an error.\n' + "But it didn't throw anything.",
    };
  }

  const pass = predicate(error, type, message);
  if (pass) {
    return { pass: true, message: () => passMessage(utils, error, getExpectedError(type, message)) };
  }

  return { pass: false, message: () => failMessage(utils, error, getExpectedError(type, message)) };
}
