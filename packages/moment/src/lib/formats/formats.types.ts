import { Flavored } from '@ization/core';

/** Named format for pipes */
export type NamedFormat = 'short' | 'medium' | 'long';
/** Raw format for pipes - a string of [moment.js tokens](https://momentjs.com/docs/#/displaying/format/) */
export type RawFormat = Flavored<string, 'IzMomentRawFormat'>;
/** Format for pipes */
export type Format = NamedFormat | RawFormat;

/** Helper that checks whether a string is one of known NamedFormat values */
export function isNamedFormat(input?: string): input is NamedFormat {
  return Boolean(input && ['short', 'medium', 'long'].includes(input));
}
