import { Pipe, PipeTransform } from '@angular/core';

import { SimpleFormat } from '../formats/formats.types';
import { MonthDayFormatOptions } from '../formats/format-options.types';
import { IzTemporalPipeBase } from './pipe-base.class';

/**
 * `izMonthDay` pipe that formats non-zoned input into month & day string
 * @category Pipes
 */
@Pipe({
  name: 'izMonthDay',
  pure: false,
})
export class IzMonthDayPipe extends IzTemporalPipeBase<Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainMonthDay, SimpleFormat | MonthDayFormatOptions> implements PipeTransform {
  formatTemporal(input: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainMonthDay, options: SimpleFormat | MonthDayFormatOptions = 'medium'): string {
    if (typeof options === 'string') {
      options = this.formats.monthDay[options];
    }
    let calendar = new Intl.DateTimeFormat(this.linkService.preferredLocaleCodes).resolvedOptions().calendar;
    if (input instanceof Temporal.PlainMonthDay) {
      input = input.toPlainDate({year: 1972}).withCalendar(calendar).toPlainMonthDay();
    } else {
      input = input.withCalendar(calendar).toPlainMonthDay();
    }
    return input.toLocaleString(this.linkService.preferredLocaleCodes, options);
  }
}
