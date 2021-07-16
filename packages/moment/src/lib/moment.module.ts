import { ModuleWithProviders, NgModule } from '@angular/core';

import { IzPluginLinks } from '@ization/core';

import { izMomentDefaultFormats } from './formats/formats.default';
import { IzMomentFormats } from './formats/formats.token';
import { IzMDateTimePipe } from './pipes/date-time.pipe';
import { IzMDatePipe } from './pipes/date.pipe';
import { IzMTimePipe } from './pipes/time.pipe';
import { IzMWeekdayPipe } from './pipes/weekday.pipe';
import { IzMYearMonthPipe } from './pipes/year-month.pipe';
import { IzMomentPluginLinkService } from './plugin-link.service';

const PIPES = [
  IzMDatePipe,
  IzMTimePipe,
  IzMDateTimePipe,
  IzMYearMonthPipe,
  IzMWeekdayPipe,
];

/**
 * **@ization/moment** Angular module
 *
 * Import [[`IzMomentModule`]] directly to use default formats or via [[`IzMomentModule.withCustomFormats`]] method to define custom formats.
 *
 * @category Angular Module
 *
 * @mermaid
 * classDiagram
 * IzCoreModule <-- IzMomentModule
 * IzPluginLink <|.. IzMomentPluginLinkService
 * IzMomentModule *-- IzMomentPluginLinkService
 * IzMomentModule *-- IzMomentFormats
 * IzMomentModule *-- IzM___Pipe
 * IzMomentPipeBase <|-- IzM___Pipe
 * IzMomentPluginLinkService <-- IzMomentPipeBase
 * IzMomentFormats <-- IzMomentPipeBase
 * IzMomentPipeBase --> moment
 */
@NgModule({
  declarations: PIPES,
  exports: PIPES,
  providers: [
    {provide: IzMomentFormats, useValue: izMomentDefaultFormats},
    {provide: IzPluginLinks, multi: true, useExisting: IzMomentPluginLinkService},
  ],
})
export class IzMomentModule {
  /** Define custom formats to be used by this module */
  public static withCustomFormats(customFormats: IzMomentFormats): ModuleWithProviders<IzMomentModule> {
    return {
      ngModule: IzMomentModule,
      providers: [
        {provide: IzMomentFormats, useValue: customFormats},
      ],
    };
  }
}
