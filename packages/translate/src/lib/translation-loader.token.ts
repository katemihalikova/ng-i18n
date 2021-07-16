import { InjectionToken } from '@angular/core';
import { IzLocaleCode } from '@ization/core';
import { MessageData } from '@messageformat/runtime/lib/messages';

/** Simple translation loader type for e.g. inline loaders */
export type IzTranslateFunctionTranslationLoader = (localeCode: IzLocaleCode) => Promise<MessageData | {default: MessageData}>;
/** Class-based translation loader type for e.g. loaders in Angular providers */
export interface IzTranslateClassTranslationLoader {
  loadTranslation: IzTranslateFunctionTranslationLoader;
}

/**
 * Type for injection token that provides some kind of locale loader for use in the module
 * @category Injection Tokens
 */
export type IzTranslateTranslationLoader = IzTranslateClassTranslationLoader | IzTranslateFunctionTranslationLoader;

/**
 * Injection token that provides some kind of locale loader for use in the module
 * @category Injection Tokens
 */
export const IzTranslateTranslationLoader = new InjectionToken<IzTranslateTranslationLoader>('IzTranslateTranslationLoader');
