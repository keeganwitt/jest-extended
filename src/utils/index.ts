export const contains = (equals: any, list: any, value: any) => {
  const length = list.length;
  for (let i = 0; i < length; i++) {
    if (equals(list[i], value)) {
      return true;
    }
  }
  return false;
};

export const determinePropertyMessage = (actual: any, property: any, message = 'Not Accessible') => {
  return actual != null && Object.hasOwn(actual, property) ? actual[property] : message;
};

export const isJestMockOrSpy: any = (value: any) => {
  return !!(value && value._isMockFunction === true && typeof value.mock === 'object');
};

export const containsEntry = (equals: any, obj: any, [key, value]: [any, any]) =>
  obj != null && Object.hasOwn(obj, key) && equals(obj[key], value);
