// @ts-ignore
import { IzLocaleCode } from '@ization/core';

declare module '@ization/core' {
  interface IzLocaleDefinition {
    momentLocaleCode?: IzLocaleCode;
  }
}
