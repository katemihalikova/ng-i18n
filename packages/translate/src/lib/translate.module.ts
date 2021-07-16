import { ModuleWithProviders, NgModule } from '@angular/core';

import { IzLocaleCode, IzPluginLinks } from '@ization/core';

import { IzTranslateFallbackLocale } from './fallback-locale.token';
import { IzTranslateNumberOfLoadedLocales } from './number-of-loaded-locales.token';
import { IzTranslatePluginLinkService } from './plugin-link.service';
import { IzTranslatePipe } from './translate.pipe';
import { IzTranslateClassTranslationLoader, IzTranslateFunctionTranslationLoader, IzTranslateTranslationLoader } from './translation-loader.token';

/**
 * **@ization/translate** Angular module
 *
 * Import this module via [[`IzTranslateModule.withConfig`]] method.
 *
 * @category Angular Module
 *
 * @mermaid
 * classDiagram
 * IzCoreModule <-- IzTranslateModule
 * IzTranslateModule *-- IzTranslateTranslationLoader
 * IzTranslateModule *-- IzTranslateNumberOfLoadedLocales
 * IzTranslateModule *-- IzTranslateFallbackLocale
 * IzTranslateModule *-- IzTranslatePluginLinkService
 * IzTranslateModule *-- IzTranslatePipe
 * IzPluginLink <|.. IzTranslatePluginLinkService
 * IzAbstractPipe <|-- IzTranslatePipe
 * IzTranslatePluginLinkService --> IzTranslateTranslationLoader
 * IzTranslatePluginLinkService --> IzTranslateNumberOfLoadedLocales
 * IzTranslatePluginLinkService --> IzTranslateFallbackLocale
 * IzTranslatePipe --> IzTranslatePluginLinkService
 */
@NgModule({
  declarations: [
    IzTranslatePipe,
  ],
  exports: [
    IzTranslatePipe,
  ],
  providers: [
    {provide: IzPluginLinks, multi: true, useExisting: IzTranslatePluginLinkService},
  ],
})
export class IzTranslateModule {
  /** Define required and optional configuration for this module */
  static withConfig(config: {
    translationLoader: IzTranslateClassTranslationLoader | IzTranslateFunctionTranslationLoader,
    numberOfLoadedLocales?: number,
    fallbackLocaleCode: IzLocaleCode,
  }): ModuleWithProviders<IzTranslateModule> {
    return {
      ngModule: IzTranslateModule,
      providers: [
        {provide: IzTranslateTranslationLoader, useValue: config.translationLoader},
        {provide: IzTranslateNumberOfLoadedLocales, useValue: config.numberOfLoadedLocales || 1},
        {provide: IzTranslateFallbackLocale, useValue: config.fallbackLocaleCode},
      ],
    };
  }
}
