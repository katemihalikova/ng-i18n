import { IzTemporalFormats } from './formats.token';

/** Default formats used by this module. You can re-use and extend it when creating a custom formats object. */
export const izTemporalDefaultFormats: IzTemporalFormats = {
  date: {
    short: {day: 'numeric', month: 'numeric'},
    medium: {day: 'numeric', month: 'numeric', year: 'numeric'},
    long: {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'},
  },
  time: {
    short: {hour: 'numeric', minute: 'numeric'},
    medium: {hour: 'numeric', minute: 'numeric', second: 'numeric'},
    long: {hour: '2-digit', minute: '2-digit', second: '2-digit'},
    zonedShort: {hour: 'numeric', minute: 'numeric', timeZoneName: 'short'},
    zonedMedium: {hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'},
    zonedLong: {hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'long'},
  },
  dateTime: {
    short: {day: 'numeric', month: 'numeric', hour: 'numeric', minute: 'numeric'},
    medium: {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'},
    long: {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long', hour: '2-digit', minute: '2-digit', second: '2-digit'},
    zonedShort: {day: 'numeric', month: 'numeric', hour: 'numeric', minute: 'numeric', timeZoneName: 'short'},
    zonedMedium: {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'},
    zonedLong: {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'long'},
  },
  yearMonth: {
    short: {month: 'numeric', year: 'numeric'},
    medium: {month: 'short', year: 'numeric'},
    long: {month: 'long', year: 'numeric'},
  },
  monthDay: {
    short: {day: 'numeric', month: 'numeric'},
    medium: {day: 'numeric', month: 'short'},
    long: {day: 'numeric', month: 'long'},
  },
  weekday: {
    short: {weekday: 'narrow'},
    medium: {weekday: 'short'},
    long: {weekday: 'long'},
  },
};
