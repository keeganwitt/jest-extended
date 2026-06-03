import { isJestMockOrSpy, mockCheckFailMessage } from 'src/utils';

export function toHaveBeenCalledBefore(
  actual: unknown,
  expected: jest.MockInstance<any, any[]>,
  failIfNoSecondInvocation: boolean = true,
) {
  // @ts-expect-error OK to have implicit any for this.utils
  const { printReceived, printExpected, matcherHint } = this.utils;

  if (!isJestMockOrSpy(actual)) {
    // @ts-expect-error OK to have implicit any for this.utils
    return { pass: false, message: mockCheckFailMessage(this.utils, '.toHaveBeenCalledBefore', actual, true) };
  }

  if (!isJestMockOrSpy(expected)) {
    // @ts-expect-error OK to have implicit any for this.utils
    return { pass: false, message: mockCheckFailMessage(this.utils, '.toHaveBeenCalledBefore', expected, false) };
  }

  let pass = false;
  let firstInvocationCallOrder = null;
  let secondInvocationCallOrder = null;
  // @ts-expect-error isJestMockOrSpy provides the type check
  firstInvocationCallOrder = actual.mock.invocationCallOrder;
  secondInvocationCallOrder = expected.mock.invocationCallOrder;
  pass = predicate(firstInvocationCallOrder, secondInvocationCallOrder, failIfNoSecondInvocation);

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('.not.toHaveBeenCalledBefore') +
          '\n\n' +
          'Expected first mock to not have been called before, invocationCallOrder:\n' +
          `  ${printExpected(firstInvocationCallOrder)}\n` +
          'Received second mock with invocationCallOrder:\n' +
          `  ${printReceived(secondInvocationCallOrder)}`
        : matcherHint('.toHaveBeenCalledBefore') +
          '\n\n' +
          'Expected first mock to have been called before, invocationCallOrder:\n' +
          `  ${printExpected(firstInvocationCallOrder)}\n` +
          'Received second mock with invocationCallOrder:\n' +
          `  ${printReceived(secondInvocationCallOrder)}`,
  };
}

const smallest = (ns: number[]) => ns.reduce((acc: number, n: number) => (acc < n ? acc : n));

const predicate = (
  firstInvocationCallOrder: number[],
  secondInvocationCallOrder: number[],
  failIfNoSecondInvocation: boolean,
) => {
  if (firstInvocationCallOrder.length === 0) return false;
  if (secondInvocationCallOrder.length === 0) return !failIfNoSecondInvocation;

  const firstSmallest = smallest(firstInvocationCallOrder);
  const secondSmallest = smallest(secondInvocationCallOrder);

  return firstSmallest < secondSmallest;
};
