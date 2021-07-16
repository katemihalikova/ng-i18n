import { NgModule } from '@angular/core';

import { SharedModule } from '../shared.module';
import { MomentDemoComponent } from './moment-demo.component';
import { FormatSelectComponent } from './format-select/format-select.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    MomentDemoComponent,
    FormatSelectComponent,
  ],
  exports: [
    MomentDemoComponent,
  ],
})
export class MomentDemoModule {}
