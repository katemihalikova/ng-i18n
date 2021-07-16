// Workaround for IDE tools - explicitly declare the interface that is extended by other modules

export * from './public-api';

import { IzLocaleCode } from './lib/types/locale-code';
declare module '@ization/core' {
  interface IzLocaleDefinition {
    localeCode: IzLocaleCode;
  }
}
