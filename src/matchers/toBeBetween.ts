import { dateMatcher } from './utils';

export function toBeBetween(this: any, actual: unknown, startDate: Date, endDate: Date) {
  return dateMatcher(
    this,
    'toBeBetween',
    (actualDate: Date) => actualDate >= startDate && actualDate <= endDate,
    actual,
    `between ${this.utils.printReceived(startDate)} and ${this.utils.printReceived(endDate)}`,
  );
}
