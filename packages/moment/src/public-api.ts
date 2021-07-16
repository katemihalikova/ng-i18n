/**
 * [[include:moment/README.md]]
 * @module @ization/moment
 */

import './lib/locale-definition.patch';

export * from './lib/moment.module';
export * from './lib/plugin-link.service';

export * from './lib/formats/formats.default';
export * from './lib/formats/formats.token';
export * from './lib/formats/formats.types';

export * from './lib/pipes/pipe-base.class';
export * from './lib/pipes/date-time.pipe';
export * from './lib/pipes/date.pipe';
export * from './lib/pipes/time.pipe';
export * from './lib/pipes/weekday.pipe';
export * from './lib/pipes/year-month.pipe';
