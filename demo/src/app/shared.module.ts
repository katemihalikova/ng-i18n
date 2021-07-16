import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IzCoreModule, IzLocaleDefinition } from '@ization/core';
import { IzTranslateModule } from '@ization/translate';
import { IzTemporalModule } from '@ization/temporal';
import { IzMomentModule } from '@ization/moment';

const LOCALES: IzLocaleDefinition[] = [
  {localeCode: 'cs-CZ', translateLocaleCode: 'cs'}, // Czech
  {localeCode: 'cs-x-japan', translateLocaleCode: 'cs', temporalLocaleCode: 'cs-CZ-u-ca-japanese', momentLocaleCode: 'cs'}, // Czech with Japanese imperial calendar via custom locale code
  {localeCode: 'ja'}, // Japanese
  {localeCode: 'ja-JP-u-ca-japanese', translateLocaleCode: 'ja'}, // Japanese with Japanese imperial calendar
  {localeCode: 'en-GB', translateLocaleCode: 'en'}, // English with British formatting
  {localeCode: 'en-US'}, // English with America formatting
];

@NgModule({
  imports: [
    IzCoreModule.withLocales(LOCALES),
    IzTranslateModule.withConfig({
      fallbackLocaleCode: 'en',
      translationLoader: async locale => await import(
        /* webpackInclude: /\.js$/ */
        /* webpackChunkName: "translations-[request]" */
        `../translations/${locale}`
      ).catch(() => ({})),
    }),
    IzTemporalModule,
    IzMomentModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    IzCoreModule,
    IzTranslateModule,
    IzTemporalModule,
    IzMomentModule,
  ],
})
export class SharedModule {}
