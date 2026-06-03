export const contains = (equals: any, list: any, value: any) => {
  return list.findIndex((item: any) => equals(item, value)) > -1;
};

export const determinePropertyMessage = (actual: any, property: any, message = 'Not Accessible') => {
  return actual != null && Object.hasOwn(actual, property) ? actual[property] : message;
};

export const isJestMockOrSpy: any = (value: any) => {
  return !!(value && value._isMockFunction === true && typeof value.mock === 'object');
};

export const containsEntry = (equals: any, obj: any, [key, value]: [any, any]) =>
  obj != null && Object.hasOwn(obj, key) && equals(obj[key], value);

export const mockCheckFailMessage = (
  utils: any,
  matcherName: string,
  value: unknown,
  isReceivedValue: boolean,
  receivedName?: string,
  expectedName?: string,
) => () => {
  const valueKind = isReceivedValue ? 'Received' : 'Expected';
  const valueKindPrintFunc = isReceivedValue ? utils.printReceived : utils.printExpected;
  const argName = isReceivedValue ? (receivedName ?? 'received') : (expectedName ?? 'expected');

  return (
    utils.matcherHint(matcherName, receivedName, expectedName) +
    '\n\n' +
    `Matcher error: ${valueKindPrintFunc(argName)} must be a mock or spy function` +
    '\n\n' +
    utils.printWithType(valueKind, value, valueKindPrintFunc)
  );
};
