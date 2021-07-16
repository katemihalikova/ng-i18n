import { InjectionToken } from '@angular/core';

/**
 * Type for injection token that provides number of locales that should be loaded in the module
 * @category Injection Tokens
 */
export type IzTranslateNumberOfLoadedLocales = number;

/**
 * Injection token that provides number of locales that should be loaded in the module
 * @category Injection Tokens
 */
export const IzTranslateNumberOfLoadedLocales = new InjectionToken<IzTranslateNumberOfLoadedLocales>('IzTranslateNumberOfLoadedLocales');
