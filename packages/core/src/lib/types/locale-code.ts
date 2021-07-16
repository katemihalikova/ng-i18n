import { Flavored } from './flavored';

/**
 * Locale code
 * @todo Add support for Intl.Locale as well after https://github.com/microsoft/TypeScript/issues/37326 gets resolved.
 */
export type IzLocaleCode = Flavored<string, 'IzLocaleCode'>;
