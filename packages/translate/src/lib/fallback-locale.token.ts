import { InjectionToken } from '@angular/core';
import { IzLocaleCode } from '@ization/core';

/**
 * Type for injection token that provides fallback locale used in the module
 * @category Injection Tokens
 */
export type IzTranslateFallbackLocale = IzLocaleCode | undefined;

/**
 * Injection token that provides fallback locale used in the module
 * @category Injection Tokens
 */
export const IzTranslateFallbackLocale = new InjectionToken<IzTranslateFallbackLocale>('IzTranslateFallbackLocale');
