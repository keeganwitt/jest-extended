export const contains = <T>(equals: (a: T, b: T) => boolean, list: T[], value: T): boolean => {
  return list.findIndex((item: T) => equals(item, value)) > -1;
};

export const determinePropertyMessage = (
  actual: unknown,
  property: PropertyKey,
  message = 'Not Accessible',
): unknown => {
  return actual != null && (typeof actual === 'object' || typeof actual === 'function') && Object.hasOwn(actual, property)
    ? (actual as Record<PropertyKey, unknown>)[property]
    : message;
};

export const isJestMockOrSpy = (value: unknown): value is jest.MockInstance<unknown, unknown[]> => {
  return !!(
    value &&
    (typeof value === 'object' || typeof value === 'function') &&
    '_isMockFunction' in value &&
    (value as Record<string, unknown>)._isMockFunction === true &&
    'mock' in value &&
    typeof (value as Record<string, unknown>).mock === 'object'
  );
};

export const containsEntry = <T>(
  equals: (a: T, b: T) => boolean,
  obj: unknown,
  [key, value]: readonly [PropertyKey, T],
): boolean =>
  obj != null &&
  (typeof obj === 'object' || typeof obj === 'function') &&
  Object.hasOwn(obj, key) &&
  equals((obj as Record<PropertyKey, unknown>)[key] as T, value);
