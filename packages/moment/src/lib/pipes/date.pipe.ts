import { Pipe, PipeTransform } from '@angular/core';

import { NamedFormat, RawFormat } from '../formats/formats.types';
import { IzMomentPipeBase } from './pipe-base.class';

/**
 * `izMDate` pipe that formats input into date string
 * @category Pipes
 */
@Pipe({
  name: 'izMDate',
  pure: false,
})
export class IzMDatePipe extends IzMomentPipeBase implements PipeTransform {
  protected getRawFormat(format: NamedFormat): RawFormat {
    return this.formats.date[format];
  }
}
