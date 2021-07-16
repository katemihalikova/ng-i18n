import { Pipe, PipeTransform } from '@angular/core';

import { SimpleFormat, SimpleOrZonedFormat } from '../formats/formats.types';
import { DateTimeFormatOptions, ZonedDateTimeFormatOptions } from '../formats/format-options.types';
import { IzTemporalPipeBase } from './pipe-base.class';

/**
 * `izDateTime` pipe that formats non-zoned input into date & time string
 * @category Pipes
 */
@Pipe({
  name: 'izDateTime',
  pure: false,
})
export class IzDateTimePipe extends IzTemporalPipeBase<Temporal.PlainDateTime, SimpleFormat | [SimpleFormat, SimpleFormat] | DateTimeFormatOptions> implements PipeTransform {
  formatTemporal(input: Temporal.PlainDateTime, options: SimpleFormat | [SimpleFormat, SimpleFormat] | DateTimeFormatOptions = 'medium'): string {
    if (typeof options === 'string') {
      options = this.formats.dateTime[options];
    } else if (Array.isArray(options)) {
      let [dateFormat, timeFormat] = options;
      options = {...this.formats.date[dateFormat], ...this.formats.time[timeFormat]} as DateTimeFormatOptions;
    }
    let calendar = new Intl.DateTimeFormat(this.linkService.preferredLocaleCodes).resolvedOptions().calendar;
    return input.withCalendar(calendar).toLocaleString(this.linkService.preferredLocaleCodes, options);
  }
}

/**
 * `izZonedDateTime` pipe that formats zoned input into date & time string using provided time zone
 * @category Pipes
 */
@Pipe({
  name: 'izZonedDateTime',
  pure: false,
})
export class IzZonedDateTimePipe extends IzTemporalPipeBase<Temporal.ZonedDateTime, SimpleOrZonedFormat | [SimpleFormat, SimpleOrZonedFormat] | ZonedDateTimeFormatOptions> implements PipeTransform {
  formatTemporal(input: Temporal.ZonedDateTime, options: SimpleOrZonedFormat | [SimpleFormat, SimpleOrZonedFormat] | ZonedDateTimeFormatOptions = 'medium'): string {
    if (typeof options === 'string') {
      options = this.formats.dateTime[options];
    } else if (Array.isArray(options)) {
      let [dateFormat, timeFormat] = options;
      options = {...this.formats.date[dateFormat], ...this.formats.time[timeFormat]} as DateTimeFormatOptions;
    }
    let calendar = new Intl.DateTimeFormat(this.linkService.preferredLocaleCodes).resolvedOptions().calendar;
    return input.withCalendar(calendar).toLocaleString(this.linkService.preferredLocaleCodes, options);
  }
}

/**
 * `izLocalDateTime` pipe that formats zoned input into date & time string using local time zone
 * @category Pipes
 */
@Pipe({
  name: 'izLocalDateTime',
  pure: false,
})
export class IzLocalDateTimePipe extends IzTemporalPipeBase<Temporal.ZonedDateTime | Temporal.Instant, SimpleOrZonedFormat | [SimpleFormat, SimpleOrZonedFormat] | ZonedDateTimeFormatOptions> implements PipeTransform {
  /** @internal */
  public localTimezone = Temporal.now.timeZone();

  formatTemporal(input: Temporal.ZonedDateTime | Temporal.Instant, options: SimpleOrZonedFormat | [SimpleFormat, SimpleOrZonedFormat] | ZonedDateTimeFormatOptions = 'medium'): string {
    if (typeof options === 'string') {
      options = this.formats.dateTime[options];
    } else if (Array.isArray(options)) {
      let [dateFormat, timeFormat] = options;
      options = {...this.formats.date[dateFormat], ...this.formats.time[timeFormat]} as DateTimeFormatOptions;
    }
    if (input instanceof Temporal.Instant) {
      input = input.toZonedDateTimeISO(this.localTimezone);
    } else {
      input = input.withTimeZone(this.localTimezone);
    }
    let calendar = new Intl.DateTimeFormat(this.linkService.preferredLocaleCodes).resolvedOptions().calendar;
    return input.withCalendar(calendar).toLocaleString(this.linkService.preferredLocaleCodes, options);
  }
}
