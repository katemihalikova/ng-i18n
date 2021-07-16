import { InjectionToken } from '@angular/core';
import { IzLocaleDefinition } from '../types/locale-definition';

/**
 * Type for injection token that is used to provide locale configuration for this module and its plugins
 * @category Injection Tokens
 */
export type IzLocaleDefinitions = IzLocaleDefinition[];

/**
 * Injection token that is used to provide locale configuration for this module and its plugins
 * @category Injection Tokens
 */
export const IzLocaleDefinitions = new InjectionToken<IzLocaleDefinitions>('IzLocaleDefinitions');
