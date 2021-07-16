import { IzMomentFormats } from './formats.token';

/** Default formats used by this module. You can re-use and extend it when creating a custom formats object. */
export const izMomentDefaultFormats: IzMomentFormats = {
  date: {
    short: 'l',
    medium: 'L',
    long: 'LL',
  },
  time: {
    short: 'LT',
    medium: 'LTS',
    long: 'LTS',
  },
  dateTime: {
    short: 'l LT',
    medium: 'lll',
    long: 'LLLL',
  },
  yearMonth: {
    short: 'M/YYYY',
    medium: 'MMM YYYY',
    long: 'MMMM YYYY',
  },
  weekday: {
    short: 'dd',
    medium: 'ddd',
    long: 'dddd',
  },
};
