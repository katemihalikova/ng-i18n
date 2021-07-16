/** @todo Remove this file after upgrade to Angular 12 */
declare namespace Intl {
  export interface DateTimeFormatOptions {
    hour12?: boolean;
    timeZone?: 'UTC' | string;
    dateStyle?: 'full' | 'long' | 'medium' | 'short';
    timeStyle?: 'full' | 'long' | 'medium' | 'short';
    calendar?: string;
    dayPeriod?: 'narrow' | 'short' | 'long';
    numberingSystem?: string;
    hourCycle?: 'h11' | 'h12' | 'h23' | 'h24';
    fractionalSecondDigits?: 0 | 1 | 2 | 3;
  }
}
