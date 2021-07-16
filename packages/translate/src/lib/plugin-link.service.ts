import { Injectable, Optional } from '@angular/core';
import Messages, { MessageData } from '@messageformat/runtime/lib/messages';
import { uniq, zipObject } from 'lodash';

import { IzLocaleCode, IzLocaleDefinition, IzPluginLink } from '@ization/core';

import { IzTranslateFallbackLocale } from './fallback-locale.token';
import { IzTranslateNumberOfLoadedLocales } from './number-of-loaded-locales.token';
import { IzTranslateTranslationLoader } from './translation-loader.token';

/**
 * Plugin link class for `@ization/translate`. See [[`IzPluginLink`]] for more info.
 * @category Services
 */
@Injectable({providedIn: 'root'})
export class IzTranslatePluginLinkService implements IzPluginLink {
  private loader: IzTranslateTranslationLoader;
  private numberOfLoadedLocales: IzTranslateNumberOfLoadedLocales;
  private fallbackLocaleCode: IzTranslateFallbackLocale;

  constructor(
    @Optional() loader: IzTranslateTranslationLoader | null,
    @Optional() numberOfLoadedLocales: IzTranslateNumberOfLoadedLocales | null,
    @Optional() fallbackLocaleCode: IzTranslateFallbackLocale | null,
  ) {
    if (!loader || !fallbackLocaleCode) {
      throw new TypeError('@ization/translate: You must configure the module using IzTranslateModule.withConfig(config) import.');
    }

    this.loader = loader;
    this.numberOfLoadedLocales = Math.max(numberOfLoadedLocales || 0, 1);
    this.fallbackLocaleCode = fallbackLocaleCode;
  }

  /** Dictionary of translated strings */
  public translations?: Messages;
  private nextTranslations?: Messages;

  public async onLocalePreferenceChangeStart(localeDefinitions: IzLocaleDefinition[]): Promise<void> {
    this.translations = undefined;

    let localeCodes = uniq(localeDefinitions.map(({localeCode, translateLocaleCode}) => translateLocaleCode || localeCode))
      .slice(0, this.numberOfLoadedLocales);

    if (this.fallbackLocaleCode && !localeCodes.includes(this.fallbackLocaleCode)) {
      localeCodes.push(this.fallbackLocaleCode);
    }

    let rawTranslations = zipObject(
      localeCodes,
      await Promise.all(localeCodes.map(localeCode => this.loadTranslations(localeCode))),
    );

    this.nextTranslations = new Messages(rawTranslations);
    // tslint:disable-next-line no-non-null-assertion
    this.nextTranslations.setFallback(localeCodes[0]!, localeCodes.slice(1));
  }

  public onLocalePreferenceChangeFinish(): void {
    this.translations = this.nextTranslations;
  }

  private async loadTranslations(localeCode: IzLocaleCode): Promise<MessageData> {
    let translations = await (typeof this.loader === 'object' ? this.loader.loadTranslation : this.loader)(localeCode);
    return this.hasDefaultExport(translations) ? translations.default : translations;
  }

  private hasDefaultExport<T>(object: T | {default: T}): object is {default: T} {
    return 'default' in object;
  }
}
