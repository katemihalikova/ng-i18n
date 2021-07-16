import { ChangeDetectorRef, Injectable } from '@angular/core';
import { IzAbstractPipe, IzCoreService } from '@ization/core';
import moment, { MomentInput } from 'moment';

import { IzMomentFormats } from '../formats/formats.token';
import { Format, isNamedFormat, NamedFormat, RawFormat } from '../formats/formats.types';
import { IzMomentPluginLinkService } from '../plugin-link.service';

const ISO_8601_FORMATS = [
  // try default datetime and date-only formats first
  moment.ISO_8601,

  // time-only formats are not included in above constant
  'HH:mm:ss.SSSSZ',
  'HH:mm:ss,SSSSZ',
  'HH:mm:ssZ',
  'HH:mmZ',
  'HH:mm:ss.SSSS',
  'HH:mm:ss,SSSS',
  'HH:mm:ss',
  'HH:mm',
];

/**
 * Base class for all pipes in this module.
 * Includes all formatting logic except choosing the right [[`RawFormat`]].
 * @category Pipes
 */
@Injectable()
export abstract class IzMomentPipeBase extends IzAbstractPipe<MomentInput, [Format | void]> {
  constructor(
    private linkService: IzMomentPluginLinkService,
    protected formats: IzMomentFormats,
    coreService: IzCoreService,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(coreService, changeDetectorRef);
  }

  /** Pipe logic - convert an input into a localized string via moment.js. */
  convert(input: MomentInput, format: Format = 'medium'): string {
    if (this.linkService.preferredLocaleCodes === undefined) {
      return '';
    }

    if (isNamedFormat(format)) {
      format = this.getRawFormat(format);
    }

    return moment(input, ISO_8601_FORMATS, true).locale(this.linkService.preferredLocaleCodes).format(format);
  }

  /** Extend this method to provide a way to convert [[`NamedFormat`]] into [[`RawFormat`]]. */
  protected abstract getRawFormat(format: NamedFormat): RawFormat;
}
