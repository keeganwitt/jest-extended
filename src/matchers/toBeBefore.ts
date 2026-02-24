import { dateMatcher } from './utils';

export function toBeBefore(this: any, actual: unknown, expected: Date) {
  return dateMatcher(
    this,
    'toBeBefore',
    (actualDate: Date) => actualDate < expected,
    actual,
    `before ${this.utils.printReceived(expected)}`,
  );
}
