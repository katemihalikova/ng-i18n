import { InjectionToken } from '@angular/core';

import { NamedFormat, RawFormat } from './formats.types';

/**
 * Type for injection token that provides [[`NamedFormat`]] to [[`RawFormat`]] conversion used throughout the module
 * @category Injection Tokens
 */
export interface IzMomentFormats {
  date: Record<NamedFormat, RawFormat>;
  time: Record<NamedFormat, RawFormat>;
  dateTime: Record<NamedFormat, RawFormat>;
  yearMonth: Record<NamedFormat, RawFormat>;
  weekday: Record<NamedFormat, RawFormat>;
}

/**
 * Injection token that provides [[`NamedFormat`]] to [[`RawFormat`]] conversion used throughout the module
 * @category Injection Tokens
 */
export const IzMomentFormats = new InjectionToken<IzMomentFormats>('IzMomentFormats');
