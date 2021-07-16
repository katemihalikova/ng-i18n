import { Pipe, PipeTransform } from '@angular/core';

import { NamedFormat, RawFormat } from '../formats/formats.types';
import { IzMomentPipeBase } from './pipe-base.class';

/**
 * `izMTime` pipe that formats input into time string
 * @category Pipes
 */
@Pipe({
  name: 'izMTime',
  pure: false,
})
export class IzMTimePipe extends IzMomentPipeBase implements PipeTransform {
  protected getRawFormat(format: NamedFormat): RawFormat {
    return this.formats.time[format];
  }
}
