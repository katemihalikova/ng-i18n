import { NgModule } from '@angular/core';

import { SharedModule } from '../shared.module';
import { TemporalDemoComponent } from './temporal-demo.component';
import { FormatSelectComponent } from './format-select/format-select.component';
import { ZonedFormatSelectComponent } from './zoned-format-select/zoned-format-select.component';
import { TimeZoneSelectComponent } from './time-zone-select/time-zone-select.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    TemporalDemoComponent,
    FormatSelectComponent,
    ZonedFormatSelectComponent,
    TimeZoneSelectComponent,
  ],
  exports: [
    TemporalDemoComponent,
  ],
})
export class TemporalDemoModule {}
