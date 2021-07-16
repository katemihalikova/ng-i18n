import { ModuleWithProviders, NgModule } from '@angular/core';

import { IzLocaleDefinitions } from './tokens/locale-definitions.token';
import { IzLocaleDefinition } from './types/locale-definition';

/**
 * **@ization/core** Angular module
 *
 * Import this module via [[`IzCoreModule.withLocales`]] method.
 *
 * @category Angular Module
 *
 * @mermaid
 * classDiagram
 * IzCoreModule *-- IzCoreService
 * IzCoreModule *-- IzLocaleDefinitions
 * IzCoreService --> IzLocaleDefinitions
 * IzCoreService --> IzPluginLinks
 * IzPluginLinks .. plugin1
 * IzPluginLinks .. plugin2
 * IzPluginLinks .. plugin3
 */
@NgModule({})
export class IzCoreModule {
  /** Define locales with optional plugin configs to use in the whole app */
  static withLocales(localeDefinitions: IzLocaleDefinition[] = []): ModuleWithProviders<IzCoreModule> {
    return {
      ngModule: IzCoreModule,
      providers: [
        {provide: IzLocaleDefinitions, useValue: localeDefinitions},
      ],
    };
  }
}
