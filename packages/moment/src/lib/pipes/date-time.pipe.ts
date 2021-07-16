import { Pipe, PipeTransform } from '@angular/core';

import { NamedFormat, RawFormat } from '../formats/formats.types';
import { IzMomentPipeBase } from './pipe-base.class';

/**
 * `izMDateTime` pipe that formats input into date & time string
 * @category Pipes
 */
@Pipe({
  name: 'izMDateTime',
  pure: false,
})
export class IzMDateTimePipe extends IzMomentPipeBase implements PipeTransform {
  protected getRawFormat(format: NamedFormat): RawFormat {
    return this.formats.dateTime[format];
  }
}
