import { Pipe, PipeTransform } from '@angular/core';

import { SimpleFormat } from '../formats/formats.types';
import { YearMonthFormatOptions } from '../formats/format-options.types';
import { IzTemporalPipeBase } from './pipe-base.class';

/**
 * `izYearMonth` pipe that formats non-zoned input into year & month string
 * @category Pipes
 */
@Pipe({
  name: 'izYearMonth',
  pure: false,
})
export class IzYearMonthPipe extends IzTemporalPipeBase<Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth, SimpleFormat | YearMonthFormatOptions> implements PipeTransform {
  formatTemporal(input: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth, options: SimpleFormat | YearMonthFormatOptions = 'medium'): string {
    if (typeof options === 'string') {
      options = this.formats.yearMonth[options];
    }
    let calendar = new Intl.DateTimeFormat(this.linkService.preferredLocaleCodes).resolvedOptions().calendar;
    if (input instanceof Temporal.PlainYearMonth) {
      input = input.toPlainDate({day: 1}).withCalendar(calendar).toPlainYearMonth();
    } else {
      input = input.withCalendar(calendar).toPlainYearMonth();
    }
    return input.toLocaleString(this.linkService.preferredLocaleCodes, options);
  }
}
