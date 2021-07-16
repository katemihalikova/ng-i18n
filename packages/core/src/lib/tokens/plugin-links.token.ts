import { InjectionToken } from '@angular/core';
import { IzPluginLink } from '../types/plugin-link';

/**
 * Type for injection token used by plugins to subscribe to this module via [[`IzPluginLink`]]
 * @category Injection Tokens
 */
export type IzPluginLinks = IzPluginLink[];

/**
 * Injection token used by plugins to subscribe to this module via [[`IzPluginLink`]]
 *
 * This token is used for a multiprovider so it must be used with `multi: true`.
 * @category Injection Tokens
 */
export const IzPluginLinks = new InjectionToken<IzPluginLinks>('IzPluginLinks');
