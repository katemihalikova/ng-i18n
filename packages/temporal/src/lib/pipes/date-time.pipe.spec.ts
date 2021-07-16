import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { IzCoreService, IzCoreModule, IzLocaleCode } from '@ization/core';

import { IzDateTimePipe, IzLocalDateTimePipe, IzZonedDateTimePipe } from './date-time.pipe';
import { changeDetectorRefMock } from './test-helpers/change-detector-ref.mock';
import { izTemporalDefaultFormats } from '../formats/formats.default';
import { localeDefinitions } from './test-helpers/locale-definitions';
import { IzTemporalPluginLinkService } from '../plugin-link.service';
import { IzTemporalModule } from '../temporal.module';

describe('IzDateTimePipe', () => {
  let coreService: IzCoreService;
  let linkService: IzTemporalPluginLinkService;
  let pipe: IzDateTimePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IzCoreModule.withLocales(localeDefinitions),
        IzTemporalModule,
      ],
    });
    coreService = TestBed.inject(IzCoreService);
    linkService = TestBed.inject(IzTemporalPluginLinkService);
    pipe = new IzDateTimePipe(linkService, izTemporalDefaultFormats, coreService, changeDetectorRefMock);
  });

  function preferLocale(localeCode: IzLocaleCode): void {
    coreService.preferLocaleCode(localeCode);
    flushMicrotasks();
  }

  it('should create an instance', () => {
    expect(pipe).toBeInstanceOf(IzDateTimePipe);
  });

  it('should correctly format PlainDateTime', fakeAsync(() => {
    let input = Temporal.PlainDateTime.from('2012-08-02T05:04:32');

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('02/08/2012, 05:04:32');
    expect(pipe.convert(input, 'short')).toEqual('02/08, 05:04');
    expect(pipe.convert(input, 'medium')).toEqual('02/08/2012, 05:04:32');
    expect(pipe.convert(input, 'long')).toEqual('Thursday, 2 August 2012, 05:04:32');
    expect(pipe.convert(input, {dateStyle: 'long', timeStyle: 'short'})).toEqual('2 August 2012 at 05:04');
    expect(pipe.convert(input, {dateStyle: 'short', timeStyle: 'medium'})).toEqual('02/08/2012, 05:04:32');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'})).toEqual('2 August, 05:04');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('2 August, 05:04:32');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'})).toEqual('02/08/2012, 05:04');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('8/2/2012, 5:04:32 AM');
    expect(pipe.convert(input, 'short')).toEqual('8/2, 5:04 AM');
    expect(pipe.convert(input, 'medium')).toEqual('8/2/2012, 5:04:32 AM');
    expect(pipe.convert(input, 'long')).toEqual('Thursday, August 2, 2012, 05:04:32 AM');
    expect(pipe.convert(input, {dateStyle: 'long', timeStyle: 'short'})).toEqual('August 2, 2012 at 5:04 AM');
    expect(pipe.convert(input, {dateStyle: 'short', timeStyle: 'medium'})).toEqual('8/2/12, 5:04:32 AM');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'})).toEqual('August 2, 5:04 AM');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('August 2, 5:04:32 AM');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'})).toEqual('8/2/2012, 5:04 AM');

    preferLocale('ja-JP-u-ca-japanese');

    expect(pipe.convert(input)).toEqual('H24/8/2 5:04:32');
    expect(pipe.convert(input, 'short')).toEqual('8/2 5:04');
    expect(pipe.convert(input, 'medium')).toEqual('H24/8/2 5:04:32');
    expect(pipe.convert(input, 'long')).toEqual('平成24年8月2日木曜日 05:04:32');
    expect(pipe.convert(input, {dateStyle: 'long', timeStyle: 'short'})).toEqual('平成24年8月2日 5:04');
    expect(pipe.convert(input, {dateStyle: 'short', timeStyle: 'medium'})).toEqual('H24/8/2 5:04:32');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'})).toEqual('8月2日 5:04');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('8月2日 5:04:32');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'})).toEqual('H24/8/2 5:04');

    preferLocale('cs-CZ');

    expect(pipe.convert(input)).toEqual('2. 8. 2012 5:04:32');
    expect(pipe.convert(input, 'short')).toEqual('2. 8. 5:04');
    expect(pipe.convert(input, 'medium')).toEqual('2. 8. 2012 5:04:32');
    expect(pipe.convert(input, 'long')).toEqual('čtvrtek 2. srpna 2012 05:04:32');
    expect(pipe.convert(input, {dateStyle: 'long', timeStyle: 'short'})).toEqual('2. srpna 2012 5:04');
    expect(pipe.convert(input, {dateStyle: 'short', timeStyle: 'medium'})).toEqual('02.08.12 5:04:32');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'})).toEqual('2. srpna 5:04');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('2. srpna 5:04:32');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'})).toEqual('2. 8. 2012 5:04');
  }));
});

describe('IzZonedDateTimePipe', () => {
  let coreService: IzCoreService;
  let linkService: IzTemporalPluginLinkService;
  let pipe: IzZonedDateTimePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IzCoreModule.withLocales(localeDefinitions),
        IzTemporalModule,
      ],
    });
    coreService = TestBed.inject(IzCoreService);
    linkService = TestBed.inject(IzTemporalPluginLinkService);
    pipe = new IzZonedDateTimePipe(linkService, izTemporalDefaultFormats, coreService, changeDetectorRefMock);
  });

  function preferLocale(localeCode: IzLocaleCode): void {
    coreService.preferLocaleCode(localeCode);
    flushMicrotasks();
  }

  it('should create an instance', () => {
    expect(pipe).toBeInstanceOf(IzZonedDateTimePipe);
  });

  it('should correctly format ZonedDateTime', fakeAsync(() => {
    let input = Temporal.ZonedDateTime.from('2012-08-02T05:04:32+05:45[Asia/Kathmandu]');

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('02/08/2012, 05:04:32');
    expect(pipe.convert(input, 'short')).toEqual('02/08, 05:04');
    expect(pipe.convert(input, 'medium')).toEqual('02/08/2012, 05:04:32');
    expect(pipe.convert(input, 'long')).toEqual('Thursday, 2 August 2012, 05:04:32');
    expect(pipe.convert(input, 'zonedShort')).toEqual('02/08, 05:04 GMT+5:45');
    expect(pipe.convert(input, 'zonedMedium')).toEqual('02/08/2012, 5:04:32 GMT+5:45');
    expect(pipe.convert(input, 'zonedLong')).toEqual('Thursday, 2 August 2012, 05:04:32 Nepal Time');
    expect(pipe.convert(input, {dateStyle: 'long', timeStyle: 'short'})).toEqual('2 August 2012 at 05:04');
    expect(pipe.convert(input, {dateStyle: 'short', timeStyle: 'medium'})).toEqual('02/08/2012, 05:04:32');
    expect(pipe.convert(input, {dateStyle: 'long', timeStyle: 'long'})).toEqual('2 August 2012 at 05:04:32 GMT+5:45');
    expect(pipe.convert(input, {dateStyle: 'full', timeStyle: 'full'})).toEqual('Thursday, 2 August 2012 at 05:04:32 Nepal Time');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'})).toEqual('2 August, 05:04');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('2 August, 05:04:32');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'})).toEqual('02/08/2012, 05:04');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('02/08/2012, 05:04:32');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'})).toEqual('02/08/2012, 5:04:32 GMT+5:45');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'long'})).toEqual('02/08/2012, 5:04:32 Nepal Time');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('8/2/2012, 5:04:32 AM');
    expect(pipe.convert(input, 'short')).toEqual('8/2, 5:04 AM');
    expect(pipe.convert(input, 'medium')).toEqual('8/2/2012, 5:04:32 AM');
    expect(pipe.convert(input, 'long')).toEqual('Thursday, August 2, 2012, 05:04:32 AM');
    expect(pipe.convert(input, 'zonedShort')).toEqual('8/2, 5:04 AM GMT+5:45');
    expect(pipe.convert(input, 'zonedMedium')).toEqual('8/2/2012, 5:04:32 AM GMT+5:45');
    expect(pipe.convert(input, 'zonedLong')).toEqual('Thursday, August 2, 2012, 05:04:32 AM Nepal Time');
    expect(pipe.convert(input, {dateStyle: 'long', timeStyle: 'short'})).toEqual('August 2, 2012 at 5:04 AM');
    expect(pipe.convert(input, {dateStyle: 'short', timeStyle: 'medium'})).toEqual('8/2/12, 5:04:32 AM');
    expect(pipe.convert(input, {dateStyle: 'long', timeStyle: 'long'})).toEqual('August 2, 2012 at 5:04:32 AM GMT+5:45');
    expect(pipe.convert(input, {dateStyle: 'full', timeStyle: 'full'})).toEqual('Thursday, August 2, 2012 at 5:04:32 AM Nepal Time');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'})).toEqual('August 2, 5:04 AM');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('August 2, 5:04:32 AM');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'})).toEqual('8/2/2012, 5:04 AM');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('8/2/2012, 5:04:32 AM');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'})).toEqual('8/2/2012, 5:04:32 AM GMT+5:45');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'long'})).toEqual('8/2/2012, 5:04:32 AM Nepal Time');

    preferLocale('ja-JP-u-ca-japanese');

    expect(pipe.convert(input)).toEqual('H24/8/2 5:04:32');
    expect(pipe.convert(input, 'short')).toEqual('8/2 5:04');
    expect(pipe.convert(input, 'medium')).toEqual('H24/8/2 5:04:32');
    expect(pipe.convert(input, 'long')).toEqual('H24/8/2木曜日 05:04:32');
    expect(pipe.convert(input, 'zonedShort')).toEqual('8/2 5:04 GMT+5:45');
    expect(pipe.convert(input, 'zonedMedium')).toEqual('H24/8/2 5:04:32 GMT+5:45');
    expect(pipe.convert(input, 'zonedLong')).toEqual('H24/8/2木曜日 05時04分32秒 ネパール時間');
    expect(pipe.convert(input, {dateStyle: 'long', timeStyle: 'short'})).toEqual('平成24年8月2日 5:04');
    expect(pipe.convert(input, {dateStyle: 'short', timeStyle: 'medium'})).toEqual('H24/8/2 5:04:32');
    expect(pipe.convert(input, {dateStyle: 'long', timeStyle: 'long'})).toEqual('平成24年8月2日 5:04:32 GMT+5:45');
    expect(pipe.convert(input, {dateStyle: 'full', timeStyle: 'full'})).toEqual('平成24年8月2日木曜日 5時04分32秒 ネパール時間');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'})).toEqual('8/2 5:04');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('8/2 5:04:32');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'})).toEqual('H24/8/2 5:04');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('H24/8/2 5:04:32');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'})).toEqual('H24/8/2 5:04:32 GMT+5:45');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'long'})).toEqual('H24/8/2 5時04分32秒 ネパール時間');

    preferLocale('cs-CZ');

    expect(pipe.convert(input)).toEqual('2. 8. 2012 5:04:32');
    expect(pipe.convert(input, 'short')).toEqual('2. 8. 5:04');
    expect(pipe.convert(input, 'medium')).toEqual('2. 8. 2012 5:04:32');
    expect(pipe.convert(input, 'long')).toEqual('čtvrtek 2. srpna 2012 05:04:32');
    expect(pipe.convert(input, 'zonedShort')).toEqual('2. 8. 5:04 GMT+5:45');
    expect(pipe.convert(input, 'zonedMedium')).toEqual('2. 8. 2012 5:04:32 GMT+5:45');
    expect(pipe.convert(input, 'zonedLong')).toEqual('čtvrtek 2. srpna 2012 05:04:32 Nepálský čas');
    expect(pipe.convert(input, {dateStyle: 'long', timeStyle: 'short'})).toEqual('2. srpna 2012 5:04');
    expect(pipe.convert(input, {dateStyle: 'short', timeStyle: 'medium'})).toEqual('02.08.12 5:04:32');
    expect(pipe.convert(input, {dateStyle: 'long', timeStyle: 'long'})).toEqual('2. srpna 2012 5:04:32 GMT+5:45');
    expect(pipe.convert(input, {dateStyle: 'full', timeStyle: 'full'})).toEqual('čtvrtek 2. srpna 2012 5:04:32 Nepálský čas');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'})).toEqual('2. srpna 5:04');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('2. srpna 5:04:32');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'})).toEqual('2. 8. 2012 5:04');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('2. 8. 2012 5:04:32');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'})).toEqual('2. 8. 2012 5:04:32 GMT+5:45');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'long'})).toEqual('2. 8. 2012 5:04:32 Nepálský čas');
  }));
});

describe('IzLocalDateTimePipe', () => {
  let coreService: IzCoreService;
  let linkService: IzTemporalPluginLinkService;
  let pipe: IzLocalDateTimePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IzCoreModule.withLocales(localeDefinitions),
        IzTemporalModule,
      ],
    });
    coreService = TestBed.inject(IzCoreService);
    linkService = TestBed.inject(IzTemporalPluginLinkService);
    pipe = new IzLocalDateTimePipe(linkService, izTemporalDefaultFormats, coreService, changeDetectorRefMock);
  });

  function preferLocale(localeCode: IzLocaleCode): void {
    coreService.preferLocaleCode(localeCode);
    flushMicrotasks();
  }

  it('should create an instance', () => {
    expect(pipe).toBeInstanceOf(IzLocalDateTimePipe);
  });

  it('should correctly format ZonedDateTime', fakeAsync(() => {
    let input = Temporal.ZonedDateTime.from('2012-08-02T05:04:32+05:45[Asia/Kathmandu]');

    // using internal property for tests only
    pipe.localTimezone = new Temporal.TimeZone('Pacific/Marquesas');

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('01/08/2012, 13:49:32');
    expect(pipe.convert(input, 'short')).toEqual('01/08, 13:49');
    expect(pipe.convert(input, 'medium')).toEqual('01/08/2012, 13:49:32');
    expect(pipe.convert(input, 'long')).toEqual('Wednesday, 1 August 2012, 13:49:32');
    expect(pipe.convert(input, 'zonedShort')).toEqual('01/08, 13:49 GMT-9:30');
    expect(pipe.convert(input, 'zonedMedium')).toEqual('01/08/2012, 13:49:32 GMT-9:30');
    expect(pipe.convert(input, 'zonedLong')).toEqual('Wednesday, 1 August 2012, 13:49:32 Marquesas Time');
    expect(pipe.convert(input, {dateStyle: 'long', timeStyle: 'short'})).toEqual('1 August 2012 at 13:49');
    expect(pipe.convert(input, {dateStyle: 'short', timeStyle: 'medium'})).toEqual('01/08/2012, 13:49:32');
    expect(pipe.convert(input, {dateStyle: 'long', timeStyle: 'long'})).toEqual('1 August 2012 at 13:49:32 GMT-9:30');
    expect(pipe.convert(input, {dateStyle: 'full', timeStyle: 'full'})).toEqual('Wednesday, 1 August 2012 at 13:49:32 Marquesas Time');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'})).toEqual('1 August, 13:49');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('1 August, 13:49:32');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'})).toEqual('01/08/2012, 13:49');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('01/08/2012, 13:49:32');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'})).toEqual('01/08/2012, 13:49:32 GMT-9:30');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'long'})).toEqual('01/08/2012, 13:49:32 Marquesas Time');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('8/1/2012, 1:49:32 PM');
    expect(pipe.convert(input, 'short')).toEqual('8/1, 1:49 PM');
    expect(pipe.convert(input, 'medium')).toEqual('8/1/2012, 1:49:32 PM');
    expect(pipe.convert(input, 'long')).toEqual('Wednesday, August 1, 2012, 01:49:32 PM');
    expect(pipe.convert(input, 'zonedShort')).toEqual('8/1, 1:49 PM GMT-9:30');
    expect(pipe.convert(input, 'zonedMedium')).toEqual('8/1/2012, 1:49:32 PM GMT-9:30');
    expect(pipe.convert(input, 'zonedLong')).toEqual('Wednesday, August 1, 2012, 01:49:32 PM Marquesas Time');
    expect(pipe.convert(input, {dateStyle: 'long', timeStyle: 'short'})).toEqual('August 1, 2012 at 1:49 PM');
    expect(pipe.convert(input, {dateStyle: 'short', timeStyle: 'medium'})).toEqual('8/1/12, 1:49:32 PM');
    expect(pipe.convert(input, {dateStyle: 'long', timeStyle: 'long'})).toEqual('August 1, 2012 at 1:49:32 PM GMT-9:30');
    expect(pipe.convert(input, {dateStyle: 'full', timeStyle: 'full'})).toEqual('Wednesday, August 1, 2012 at 1:49:32 PM Marquesas Time');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'})).toEqual('August 1, 1:49 PM');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('August 1, 1:49:32 PM');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'})).toEqual('8/1/2012, 1:49 PM');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('8/1/2012, 1:49:32 PM');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'})).toEqual('8/1/2012, 1:49:32 PM GMT-9:30');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'long'})).toEqual('8/1/2012, 1:49:32 PM Marquesas Time');

    preferLocale('ja-JP-u-ca-japanese');

    expect(pipe.convert(input)).toEqual('H24/8/1 13:49:32');
    expect(pipe.convert(input, 'short')).toEqual('8/1 13:49');
    expect(pipe.convert(input, 'medium')).toEqual('H24/8/1 13:49:32');
    expect(pipe.convert(input, 'long')).toEqual('H24/8/1水曜日 13:49:32');
    expect(pipe.convert(input, 'zonedShort')).toEqual('8/1 13:49 GMT-9:30');
    expect(pipe.convert(input, 'zonedMedium')).toEqual('H24/8/1 13:49:32 GMT-9:30');
    expect(pipe.convert(input, 'zonedLong')).toEqual('H24/8/1水曜日 13時49分32秒 マルキーズ時間');
    expect(pipe.convert(input, {dateStyle: 'long', timeStyle: 'short'})).toEqual('平成24年8月1日 13:49');
    expect(pipe.convert(input, {dateStyle: 'short', timeStyle: 'medium'})).toEqual('H24/8/1 13:49:32');
    expect(pipe.convert(input, {dateStyle: 'long', timeStyle: 'long'})).toEqual('平成24年8月1日 13:49:32 GMT-9:30');
    expect(pipe.convert(input, {dateStyle: 'full', timeStyle: 'full'})).toEqual('平成24年8月1日水曜日 13時49分32秒 マルキーズ時間');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'})).toEqual('8/1 13:49');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('8/1 13:49:32');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'})).toEqual('H24/8/1 13:49');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('H24/8/1 13:49:32');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'})).toEqual('H24/8/1 13:49:32 GMT-9:30');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'long'})).toEqual('H24/8/1 13時49分32秒 マルキーズ時間');

    preferLocale('cs-CZ');

    expect(pipe.convert(input)).toEqual('1. 8. 2012 13:49:32');
    expect(pipe.convert(input, 'short')).toEqual('1. 8. 13:49');
    expect(pipe.convert(input, 'medium')).toEqual('1. 8. 2012 13:49:32');
    expect(pipe.convert(input, 'long')).toEqual('středa 1. srpna 2012 13:49:32');
    expect(pipe.convert(input, 'zonedShort')).toEqual('1. 8. 13:49 GMT-9:30');
    expect(pipe.convert(input, 'zonedMedium')).toEqual('1. 8. 2012 13:49:32 GMT-9:30');
    expect(pipe.convert(input, 'zonedLong')).toEqual('středa 1. srpna 2012 13:49:32 Markézský čas');
    expect(pipe.convert(input, {dateStyle: 'long', timeStyle: 'short'})).toEqual('1. srpna 2012 13:49');
    expect(pipe.convert(input, {dateStyle: 'short', timeStyle: 'medium'})).toEqual('01.08.12 13:49:32');
    expect(pipe.convert(input, {dateStyle: 'long', timeStyle: 'long'})).toEqual('1. srpna 2012 13:49:32 GMT-9:30');
    expect(pipe.convert(input, {dateStyle: 'full', timeStyle: 'full'})).toEqual('středa 1. srpna 2012 13:49:32 Markézský čas');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'})).toEqual('1. srpna 13:49');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('1. srpna 13:49:32');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'})).toEqual('1. 8. 2012 13:49');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('1. 8. 2012 13:49:32');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'})).toEqual('1. 8. 2012 13:49:32 GMT-9:30');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'long'})).toEqual('1. 8. 2012 13:49:32 Markézský čas');
  }));

  it('should correctly format Instant', fakeAsync(() => {
    let input = Temporal.Instant.from('2012-08-02T05:04:32+05:45');

    // using internal property for tests only
    pipe.localTimezone = new Temporal.TimeZone('Pacific/Marquesas');

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('01/08/2012, 13:49:32');
    expect(pipe.convert(input, 'short')).toEqual('01/08, 13:49');
    expect(pipe.convert(input, 'medium')).toEqual('01/08/2012, 13:49:32');
    expect(pipe.convert(input, 'long')).toEqual('Wednesday, 1 August 2012, 13:49:32');
    expect(pipe.convert(input, 'zonedShort')).toEqual('01/08, 13:49 GMT-9:30');
    expect(pipe.convert(input, 'zonedMedium')).toEqual('01/08/2012, 13:49:32 GMT-9:30');
    expect(pipe.convert(input, 'zonedLong')).toEqual('Wednesday, 1 August 2012, 13:49:32 Marquesas Time');
    expect(pipe.convert(input, {dateStyle: 'long', timeStyle: 'short'})).toEqual('1 August 2012 at 13:49');
    expect(pipe.convert(input, {dateStyle: 'short', timeStyle: 'medium'})).toEqual('01/08/2012, 13:49:32');
    expect(pipe.convert(input, {dateStyle: 'long', timeStyle: 'long'})).toEqual('1 August 2012 at 13:49:32 GMT-9:30');
    expect(pipe.convert(input, {dateStyle: 'full', timeStyle: 'full'})).toEqual('Wednesday, 1 August 2012 at 13:49:32 Marquesas Time');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'})).toEqual('1 August, 13:49');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('1 August, 13:49:32');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'})).toEqual('01/08/2012, 13:49');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('01/08/2012, 13:49:32');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'})).toEqual('01/08/2012, 13:49:32 GMT-9:30');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'long'})).toEqual('01/08/2012, 13:49:32 Marquesas Time');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('8/1/2012, 1:49:32 PM');
    expect(pipe.convert(input, 'short')).toEqual('8/1, 1:49 PM');
    expect(pipe.convert(input, 'medium')).toEqual('8/1/2012, 1:49:32 PM');
    expect(pipe.convert(input, 'long')).toEqual('Wednesday, August 1, 2012, 01:49:32 PM');
    expect(pipe.convert(input, 'zonedShort')).toEqual('8/1, 1:49 PM GMT-9:30');
    expect(pipe.convert(input, 'zonedMedium')).toEqual('8/1/2012, 1:49:32 PM GMT-9:30');
    expect(pipe.convert(input, 'zonedLong')).toEqual('Wednesday, August 1, 2012, 01:49:32 PM Marquesas Time');
    expect(pipe.convert(input, {dateStyle: 'long', timeStyle: 'short'})).toEqual('August 1, 2012 at 1:49 PM');
    expect(pipe.convert(input, {dateStyle: 'short', timeStyle: 'medium'})).toEqual('8/1/12, 1:49:32 PM');
    expect(pipe.convert(input, {dateStyle: 'long', timeStyle: 'long'})).toEqual('August 1, 2012 at 1:49:32 PM GMT-9:30');
    expect(pipe.convert(input, {dateStyle: 'full', timeStyle: 'full'})).toEqual('Wednesday, August 1, 2012 at 1:49:32 PM Marquesas Time');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'})).toEqual('August 1, 1:49 PM');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('August 1, 1:49:32 PM');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'})).toEqual('8/1/2012, 1:49 PM');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('8/1/2012, 1:49:32 PM');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'})).toEqual('8/1/2012, 1:49:32 PM GMT-9:30');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'long'})).toEqual('8/1/2012, 1:49:32 PM Marquesas Time');

    preferLocale('ja-JP-u-ca-japanese');

    expect(pipe.convert(input)).toEqual('H24/8/1 13:49:32');
    expect(pipe.convert(input, 'short')).toEqual('8/1 13:49');
    expect(pipe.convert(input, 'medium')).toEqual('H24/8/1 13:49:32');
    expect(pipe.convert(input, 'long')).toEqual('H24/8/1水曜日 13:49:32');
    expect(pipe.convert(input, 'zonedShort')).toEqual('8/1 13:49 GMT-9:30');
    expect(pipe.convert(input, 'zonedMedium')).toEqual('H24/8/1 13:49:32 GMT-9:30');
    expect(pipe.convert(input, 'zonedLong')).toEqual('H24/8/1水曜日 13時49分32秒 マルキーズ時間');
    expect(pipe.convert(input, {dateStyle: 'long', timeStyle: 'short'})).toEqual('平成24年8月1日 13:49');
    expect(pipe.convert(input, {dateStyle: 'short', timeStyle: 'medium'})).toEqual('H24/8/1 13:49:32');
    expect(pipe.convert(input, {dateStyle: 'long', timeStyle: 'long'})).toEqual('平成24年8月1日 13:49:32 GMT-9:30');
    expect(pipe.convert(input, {dateStyle: 'full', timeStyle: 'full'})).toEqual('平成24年8月1日水曜日 13時49分32秒 マルキーズ時間');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'})).toEqual('8/1 13:49');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('8/1 13:49:32');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'})).toEqual('H24/8/1 13:49');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('H24/8/1 13:49:32');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'})).toEqual('H24/8/1 13:49:32 GMT-9:30');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'long'})).toEqual('H24/8/1 13時49分32秒 マルキーズ時間');

    preferLocale('cs-CZ');

    expect(pipe.convert(input)).toEqual('1. 8. 2012 13:49:32');
    expect(pipe.convert(input, 'short')).toEqual('1. 8. 13:49');
    expect(pipe.convert(input, 'medium')).toEqual('1. 8. 2012 13:49:32');
    expect(pipe.convert(input, 'long')).toEqual('středa 1. srpna 2012 13:49:32');
    expect(pipe.convert(input, 'zonedShort')).toEqual('1. 8. 13:49 GMT-9:30');
    expect(pipe.convert(input, 'zonedMedium')).toEqual('1. 8. 2012 13:49:32 GMT-9:30');
    expect(pipe.convert(input, 'zonedLong')).toEqual('středa 1. srpna 2012 13:49:32 Markézský čas');
    expect(pipe.convert(input, {dateStyle: 'long', timeStyle: 'short'})).toEqual('1. srpna 2012 13:49');
    expect(pipe.convert(input, {dateStyle: 'short', timeStyle: 'medium'})).toEqual('01.08.12 13:49:32');
    expect(pipe.convert(input, {dateStyle: 'long', timeStyle: 'long'})).toEqual('1. srpna 2012 13:49:32 GMT-9:30');
    expect(pipe.convert(input, {dateStyle: 'full', timeStyle: 'full'})).toEqual('středa 1. srpna 2012 13:49:32 Markézský čas');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'})).toEqual('1. srpna 13:49');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('1. srpna 13:49:32');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'})).toEqual('1. 8. 2012 13:49');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('1. 8. 2012 13:49:32');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'})).toEqual('1. 8. 2012 13:49:32 GMT-9:30');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'long'})).toEqual('1. 8. 2012 13:49:32 Markézský čas');
  }));
});
