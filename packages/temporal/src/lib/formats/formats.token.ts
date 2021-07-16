import { InjectionToken } from '@angular/core';

import { IzTemporalFormatWrapper, IzTemporalZonedFormatWrapper } from './formats.types';
import { DateFormatOptions, DateTimeFormatOptions, MonthDayFormatOptions, TimeFormatOptions, WeekdayFormatOptions, YearMonthFormatOptions, ZonedDateTimeFormatOptions, ZonedTimeFormatOptions } from './format-options.types';

/**
 * Type for injection token that provides [[`SimpleOrZonedFormat`]] to [[`IntlFormatOptions`]] conversion used throughout the module
 * @category Injection Tokens
 */
export interface IzTemporalFormats {
  date: IzTemporalFormatWrapper<DateFormatOptions>;
  time: IzTemporalZonedFormatWrapper<TimeFormatOptions, ZonedTimeFormatOptions>;
  dateTime: IzTemporalZonedFormatWrapper<DateTimeFormatOptions, ZonedDateTimeFormatOptions>;
  yearMonth: IzTemporalFormatWrapper<YearMonthFormatOptions>;
  monthDay: IzTemporalFormatWrapper<MonthDayFormatOptions>;
  weekday: IzTemporalFormatWrapper<WeekdayFormatOptions>;
}

/**
 * Injection token that provides [[`SimpleOrZonedFormat`]] to [[`IntlFormatOptions`]] conversion used throughout the module
 * @category Injection Tokens
 */
export const IzTemporalFormats = new InjectionToken<IzTemporalFormats>('IzTemporalFormats');
