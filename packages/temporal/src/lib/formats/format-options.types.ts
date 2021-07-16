/**
 * @ignore
 * @todo Remove this interface (use `Intl.DateTimeFormatOptions` instead) after upgrade to Angular 12
 */
export interface IntlDateTimeFormatOptions extends Intl.DateTimeFormatOptions {
  localeMatcher?: 'best fit' | 'lookup';
  weekday?: 'long' | 'short' | 'narrow';
  era?: 'long' | 'short' | 'narrow';
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
  timeZoneName?: 'long' | 'short';
  formatMatcher?: 'best fit' | 'basic';
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

/** Creates exclusive subset of `Intl.DateTimeFormatOptions` defined by object keys */
export type IntlFormatOptions<K extends keyof IntlDateTimeFormatOptions> = Pick<IntlDateTimeFormatOptions, K> & Partial<Record<Exclude<keyof IntlDateTimeFormatOptions, K>, never>>;

export type DateFormatOptions = IntlFormatOptions<'era' | 'year' | 'month' | 'day' | 'weekday'> | IntlFormatOptions<'dateStyle'>;
export type TimeFormatOptions = IntlFormatOptions<'hour' | 'minute' | 'second'> | IntlFormatOptions<'timeStyle'>;
export type DateTimeFormatOptions = IntlFormatOptions<'era' | 'year' | 'month' | 'day' | 'weekday' | 'hour' | 'minute' | 'second'> | IntlFormatOptions<'dateStyle' | 'timeStyle'>;
export type ZonedTimeFormatOptions = IntlFormatOptions<'hour' | 'minute' | 'second' | 'timeZoneName'> | IntlFormatOptions<'timeStyle'>;
export type ZonedDateTimeFormatOptions = IntlFormatOptions<'era' | 'year' | 'month' | 'day' | 'weekday' | 'hour' | 'minute' | 'second' | 'timeZoneName'> | IntlFormatOptions<'dateStyle' | 'timeStyle'>;
export type YearMonthFormatOptions = IntlFormatOptions<'era' | 'year' | 'month'>;
export type MonthDayFormatOptions = IntlFormatOptions<'month' | 'day'>;
export type WeekdayFormatOptions = IntlFormatOptions<'weekday'>;
