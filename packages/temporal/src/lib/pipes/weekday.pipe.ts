import { Pipe, PipeTransform } from '@angular/core';

import { SimpleFormat } from '../formats/formats.types';
import { WeekdayFormatOptions } from '../formats/format-options.types';
import { IzTemporalPipeBase } from './pipe-base.class';

/**
 * `izWeekday` pipe that formats non-zoned input into weekday string
 * @category Pipes
 */
@Pipe({
  name: 'izWeekday',
  pure: false,
})
export class IzWeekdayPipe extends IzTemporalPipeBase<Temporal.PlainDate | Temporal.PlainDateTime, SimpleFormat | WeekdayFormatOptions> implements PipeTransform {
  formatTemporal(input: Temporal.PlainDate | Temporal.PlainDateTime, options: SimpleFormat | WeekdayFormatOptions = 'medium'): string {
    if (typeof options === 'string') {
      options = this.formats.weekday[options];
    }
    let calendar = new Intl.DateTimeFormat(this.linkService.preferredLocaleCodes).resolvedOptions().calendar;
    return input.withCalendar(calendar).toLocaleString(this.linkService.preferredLocaleCodes, options);
  }
}
