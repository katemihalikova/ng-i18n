import { NgModule } from '@angular/core';

import { SharedModule } from '../shared.module';
import { CoreDemoComponent } from './core-demo.component';
import { LocaleDefinitionComponent } from './locale-definition/locale-definition.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    CoreDemoComponent,
    LocaleDefinitionComponent,
  ],
  exports: [
    CoreDemoComponent,
  ],
})
export class CoreDemoModule {}
