import { Pipe, PipeTransform } from '@angular/core';

import { SimpleFormat, SimpleOrZonedFormat } from '../formats/formats.types';
import { TimeFormatOptions, ZonedTimeFormatOptions } from '../formats/format-options.types';
import { IzTemporalPipeBase } from './pipe-base.class';

/**
 * `izTime` pipe that formats non-zoned input into time string
 * @category Pipes
 */
@Pipe({
  name: 'izTime',
  pure: false,
})
export class IzTimePipe extends IzTemporalPipeBase<Temporal.PlainTime | Temporal.PlainDateTime, SimpleFormat | TimeFormatOptions> implements PipeTransform {
  formatTemporal(input: Temporal.PlainTime | Temporal.PlainDateTime, options: SimpleFormat | TimeFormatOptions = 'medium'): string {
    if (typeof options === 'string') {
      options = this.formats.time[options];
    }
    if (input instanceof Temporal.PlainDateTime) {
      input = input.toPlainTime();
    }
    return input.toLocaleString(this.linkService.preferredLocaleCodes, options);
  }
}

/**
 * `izZonedTime` pipe that formats zoned input into time string using provided time zone
 * @category Pipes
 */
@Pipe({
  name: 'izZonedTime',
  pure: false,
})
export class IzZonedTimePipe extends IzTemporalPipeBase<Temporal.ZonedDateTime, SimpleOrZonedFormat | ZonedTimeFormatOptions> implements PipeTransform {
  formatTemporal(input: Temporal.ZonedDateTime, options: SimpleOrZonedFormat | ZonedTimeFormatOptions = 'medium'): string {
    if (typeof options === 'string') {
      options = this.formats.time[options];
    }
    return input.toLocaleString(this.linkService.preferredLocaleCodes, options);
  }
}

/**
 * `izLocalTime` pipe that formats zoned input into time string using local time zone
 * @category Pipes
 */
@Pipe({
  name: 'izLocalTime',
  pure: false,
})
export class IzLocalTimePipe extends IzTemporalPipeBase<Temporal.ZonedDateTime | Temporal.Instant, SimpleOrZonedFormat | ZonedTimeFormatOptions> implements PipeTransform {
  /** @internal */
  public localTimezone = Temporal.now.timeZone();

  formatTemporal(input: Temporal.ZonedDateTime | Temporal.Instant, options: SimpleOrZonedFormat | ZonedTimeFormatOptions = 'medium'): string {
    if (typeof options === 'string') {
      options = this.formats.time[options];
    }
    if (input instanceof Temporal.Instant) {
      input = input.toZonedDateTimeISO(this.localTimezone);
    } else {
      input = input.withTimeZone(this.localTimezone);
    }
    return input.toLocaleString(this.linkService.preferredLocaleCodes, options);
  }
}
