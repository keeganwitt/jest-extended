import { dateMatcher } from './utils';

export function toBeAfter(this: any, actual: unknown, after: Date) {
  return dateMatcher(
    this,
    'toBeAfter',
    (actualDate: Date) => actualDate > after,
    actual,
    `after ${this.utils.printReceived(after)}`,
  );
}
