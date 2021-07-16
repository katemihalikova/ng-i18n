import { ChangeDetectorRef, Injectable } from '@angular/core';
import { IzAbstractPipe, IzCoreService } from '@ization/core';

import { IzTemporalFormats } from '../formats/formats.token';
import { IzTemporalPluginLinkService } from '../plugin-link.service';

/**
 * Base class for all pipes in this module.
 * Formatting logic is provided by each pipe via [[`formatTemporal`]].
 *
 * @template Input Pipe input - one or several Temporal datatypes supported by the pipe
 * @template Param Pipe param - supported param combination for the pipe
 * @category Pipes
 */
@Injectable()
export abstract class IzTemporalPipeBase<Input, Param> extends IzAbstractPipe<Input, [Param | void]> {
  constructor(
    protected linkService: IzTemporalPluginLinkService,
    protected formats: IzTemporalFormats,
    coreService: IzCoreService,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(coreService, changeDetectorRef);
  }

  convert(input: Input, options?: Param): string {
    if (this.linkService.preferredLocaleCodes === undefined) {
      return '';
    }
    return this.formatTemporal(input, options);
  }

  /** Extend this method to provide custom pipe logic */
  protected abstract formatTemporal(input: Input, options?: Param): string;
}
