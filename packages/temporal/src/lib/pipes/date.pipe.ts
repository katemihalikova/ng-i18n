import { Pipe, PipeTransform } from '@angular/core';

import { SimpleFormat } from '../formats/formats.types';
import { DateFormatOptions } from '../formats/format-options.types';
import { IzTemporalPipeBase } from './pipe-base.class';

/**
 * `izDate` pipe that formats non-zoned input into date string
 * @category Pipes
 */
@Pipe({
  name: 'izDate',
  pure: false,
})
export class IzDatePipe extends IzTemporalPipeBase<Temporal.PlainDate | Temporal.PlainDateTime, SimpleFormat | DateFormatOptions> implements PipeTransform {
  formatTemporal(input: Temporal.PlainDate | Temporal.PlainDateTime, options: SimpleFormat | DateFormatOptions = 'medium'): string {
    if (typeof options === 'string') {
      options = this.formats.date[options];
    }
    if (input instanceof Temporal.PlainDateTime) {
      input = input.toPlainDate();
    }
    let calendar = new Intl.DateTimeFormat(this.linkService.preferredLocaleCodes).resolvedOptions().calendar;
    return input.withCalendar(calendar).toLocaleString(this.linkService.preferredLocaleCodes, options);
  }
}

/**
 * `izZonedDate` pipe that formats zoned input into date string using provided time zone
 * @category Pipes
 */
@Pipe({
  name: 'izZonedDate',
  pure: false,
})
export class IzZonedDatePipe extends IzTemporalPipeBase<Temporal.ZonedDateTime, SimpleFormat | DateFormatOptions> implements PipeTransform {
  formatTemporal(input: Temporal.ZonedDateTime, options: SimpleFormat | DateFormatOptions = 'medium'): string {
    if (typeof options === 'string') {
      options = this.formats.date[options];
    }
    let calendar = new Intl.DateTimeFormat(this.linkService.preferredLocaleCodes).resolvedOptions().calendar;
    return input.toPlainDate().withCalendar(calendar).toLocaleString(this.linkService.preferredLocaleCodes, options);
  }
}

/**
 * `izLocalDate` pipe that formats zoned input into date string using local time zone
 * @category Pipes
 */
@Pipe({
  name: 'izLocalDate',
  pure: false,
})
export class IzLocalDatePipe extends IzTemporalPipeBase<Temporal.ZonedDateTime | Temporal.Instant, SimpleFormat | DateFormatOptions> implements PipeTransform {
  /** @internal */
  public localTimezone = Temporal.now.timeZone();

  formatTemporal(input: Temporal.ZonedDateTime | Temporal.Instant, options: SimpleFormat | DateFormatOptions = 'medium'): string {
    if (typeof options === 'string') {
      options = this.formats.date[options];
    }
    if (input instanceof Temporal.Instant) {
      input = input.toZonedDateTimeISO(this.localTimezone);
    } else {
      input = input.withTimeZone(this.localTimezone);
    }
    let calendar = new Intl.DateTimeFormat(this.linkService.preferredLocaleCodes).resolvedOptions().calendar;
    return input.toPlainDate().withCalendar(calendar).toLocaleString(this.linkService.preferredLocaleCodes, options);
  }
}
