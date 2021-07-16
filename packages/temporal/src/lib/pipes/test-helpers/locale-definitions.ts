import { IzLocaleDefinition } from '@ization/core';

export const localeDefinitions: IzLocaleDefinition[] = [
  {localeCode: 'cs-CZ'}, // Czech
  {localeCode: 'cs-x-japan', temporalLocaleCode: 'cs-CZ-u-ca-japanese'}, // Czech with Japanese imperial calendar via custom locale code
  {localeCode: 'ja'}, // Japanese
  {localeCode: 'ja-JP-u-ca-japanese'}, // Japanese with Japanese imperial calendar
  {localeCode: 'en-GB'}, // English with British formatting
  {localeCode: 'en-US'}, // English with America formatting
];
