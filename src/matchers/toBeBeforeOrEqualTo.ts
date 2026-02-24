import { dateMatcher } from './utils';

export function toBeBeforeOrEqualTo(this: any, actual: unknown, expected: Date) {
  return dateMatcher(
    this,
    'toBeBeforeOrEqualTo',
    (actualDate: Date) => actualDate <= expected,
    actual,
    `before or equal to ${this.utils.printReceived(expected)}`,
  );
}
