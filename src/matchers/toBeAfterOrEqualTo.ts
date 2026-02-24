import { dateMatcher } from './utils';

export function toBeAfterOrEqualTo(this: any, actual: unknown, expected: Date) {
  return dateMatcher(
    this,
    'toBeAfterOrEqualTo',
    (actualDate: Date) => actualDate >= expected,
    actual,
    `after or equal to ${this.utils.printReceived(expected)}`,
  );
}
