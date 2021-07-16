import { Temporal as T } from '@js-temporal/polyfill';

declare global {
  namespace Temporal {
    export const Calendar: typeof T.Calendar;
    export const Duration: typeof T.Duration;
    export const Instant: typeof T.Instant;
    export const PlainDate: typeof T.PlainDate;
    export const PlainDateTime: typeof T.PlainDateTime;
    export const PlainMonthDay: typeof T.PlainMonthDay;
    export const PlainTime: typeof T.PlainTime;
    export const PlainYearMonth: typeof T.PlainYearMonth;
    export const TimeZone: typeof T.TimeZone;
    export const ZonedDateTime: typeof T.ZonedDateTime;
    export type Calendar = T.Calendar;
    export type Duration = T.Duration;
    export type Instant = T.Instant;
    export type PlainDate = T.PlainDate;
    export type PlainDateTime = T.PlainDateTime;
    export type PlainMonthDay = T.PlainMonthDay;
    export type PlainTime = T.PlainTime;
    export type PlainYearMonth = T.PlainYearMonth;
    export type TimeZone = T.TimeZone;
    export type ZonedDateTime = T.ZonedDateTime;
    export namespace now {
      export const instant: typeof T.now.instant;
      export const plainDate: typeof T.now.plainDate;
      export const plainDateISO: typeof T.now.plainDateISO;
      export const plainDateTime: typeof T.now.plainDateTime;
      export const plainDateTimeISO: typeof T.now.plainDateTimeISO;
      export const plainTimeISO: typeof T.now.plainTimeISO;
      export const timeZone: typeof T.now.timeZone;
      export const zonedDateTime: typeof T.now.zonedDateTime;
      export const zonedDateTimeISO: typeof T.now.zonedDateTimeISO;
    }
  }
}

if (globalThis.Temporal === undefined) {
  globalThis.Temporal = T;
}
