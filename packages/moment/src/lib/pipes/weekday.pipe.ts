import { Pipe, PipeTransform } from '@angular/core';

import { NamedFormat, RawFormat } from '../formats/formats.types';
import { IzMomentPipeBase } from './pipe-base.class';

/**
 * `izMWeekday` pipe that formats input into weekday string
 * @category Pipes
 */
@Pipe({
  name: 'izMWeekday',
  pure: false,
})
export class IzMWeekdayPipe extends IzMomentPipeBase implements PipeTransform {
  protected getRawFormat(format: NamedFormat): RawFormat {
    return this.formats.weekday[format];
  }
}
