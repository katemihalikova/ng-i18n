/**
 * [[include:translate/README.md]]
 * @module @ization/translate
 */

import './lib/locale-definition.patch';

export * from './lib/translate.module';

export * from './lib/translate.pipe';
export * from './lib/plugin-link.service';

export * from './lib/fallback-locale.token';
export * from './lib/number-of-loaded-locales.token';
export * from './lib/translation-loader.token';
