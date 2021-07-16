import { NgModule } from '@angular/core';

import { SharedModule } from '../shared.module';
import { TranslateDemoComponent } from './translate-demo.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    TranslateDemoComponent,
  ],
  exports: [
    TranslateDemoComponent,
  ],
})
export class TranslateDemoModule {}
