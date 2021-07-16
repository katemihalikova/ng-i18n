import { Pipe, PipeTransform } from '@angular/core';

import { NamedFormat, RawFormat } from '../formats/formats.types';
import { IzMomentPipeBase } from './pipe-base.class';

/**
 * `izMYearMonth` pipe that formats input into year & month string
 * @category Pipes
 */
@Pipe({
  name: 'izMYearMonth',
  pure: false,
})
export class IzMYearMonthPipe extends IzMomentPipeBase implements PipeTransform {
  protected getRawFormat(format: NamedFormat): RawFormat {
    return this.formats.yearMonth[format];
  }
}
