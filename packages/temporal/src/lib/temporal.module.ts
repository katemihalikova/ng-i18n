import { ModuleWithProviders, NgModule } from '@angular/core';

import { IzPluginLinks } from '@ization/core';

import { izTemporalDefaultFormats } from './formats/formats.default';
import { IzTemporalFormats } from './formats/formats.token';
import { IzDateTimePipe, IzLocalDateTimePipe, IzZonedDateTimePipe } from './pipes/date-time.pipe';
import { IzDatePipe, IzLocalDatePipe, IzZonedDatePipe } from './pipes/date.pipe';
import { IzMonthDayPipe } from './pipes/month-day.pipe';
import { IzLocalTimePipe, IzTimePipe, IzZonedTimePipe } from './pipes/time.pipe';
import { IzWeekdayPipe } from './pipes/weekday.pipe';
import { IzYearMonthPipe } from './pipes/year-month.pipe';
import { IzTemporalPluginLinkService } from './plugin-link.service';

const PIPES = [
  IzDatePipe,
  IzLocalDatePipe,
  IzZonedDatePipe,
  IzTimePipe,
  IzLocalTimePipe,
  IzZonedTimePipe,
  IzDateTimePipe,
  IzLocalDateTimePipe,
  IzZonedDateTimePipe,
  IzYearMonthPipe,
  IzMonthDayPipe,
  IzWeekdayPipe,
];

/**
 * **@ization/temporal** Angular module
 *
 * Import [[`IzTemporalModule`]] directly to use default formats or via [[`IzTemporalModule.withCustomFormats`]] method to define custom formats.
 *
 * @category Angular Module
 *
 * @mermaid
 * classDiagram
 * IzCoreModule <-- IzTemporalModule
 * IzPluginLink <|.. IzTemporalPluginLinkService
 * IzTemporalModule *-- IzTemporalPluginLinkService
 * IzTemporalModule *-- IzTemporalFormats
 * IzTemporalModule *-- Iz___Pipe
 * IzTemporalPipeBase <|-- Iz___Pipe
 * IzTemporalPluginLinkService <-- IzTemporalPipeBase
 * IzTemporalFormats <-- IzTemporalPipeBase
 */
@NgModule({
  declarations: PIPES,
  exports: PIPES,
  providers: [
    {provide: IzTemporalFormats, useValue: izTemporalDefaultFormats},
    {provide: IzPluginLinks, multi: true, useExisting: IzTemporalPluginLinkService},
  ],
})
export class IzTemporalModule {
  /** Define custom formats to be used by this module */
  public static withCustomFormats(customFormats: IzTemporalFormats): ModuleWithProviders<IzTemporalModule> {
    return {
      ngModule: IzTemporalModule,
      providers: [
        {provide: IzTemporalFormats, useValue: customFormats},
      ],
    };
  }
}
