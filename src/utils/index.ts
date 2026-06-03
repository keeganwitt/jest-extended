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

export const smallest = (ns: number[]): number => {
  let min = ns[0] as number;
  for (let i = 1; i < ns.length; i++) {
    if ((ns[i] as number) < min) {
      min = ns[i] as number;
    }
  }
  return min;
};
