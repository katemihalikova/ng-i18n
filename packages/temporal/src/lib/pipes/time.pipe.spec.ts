import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { IzCoreService, IzCoreModule, IzLocaleCode } from '@ization/core';

import { IzTimePipe, IzLocalTimePipe, IzZonedTimePipe } from './time.pipe';
import { changeDetectorRefMock } from './test-helpers/change-detector-ref.mock';
import { izTemporalDefaultFormats } from '../formats/formats.default';
import { localeDefinitions } from './test-helpers/locale-definitions';
import { IzTemporalPluginLinkService } from '../plugin-link.service';
import { IzTemporalModule } from '../temporal.module';

describe('IzTimePipe', () => {
  let coreService: IzCoreService;
  let linkService: IzTemporalPluginLinkService;
  let pipe: IzTimePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IzCoreModule.withLocales(localeDefinitions),
        IzTemporalModule,
      ],
    });
    coreService = TestBed.inject(IzCoreService);
    linkService = TestBed.inject(IzTemporalPluginLinkService);
    pipe = new IzTimePipe(linkService, izTemporalDefaultFormats, coreService, changeDetectorRefMock);
  });

  function preferLocale(localeCode: IzLocaleCode): void {
    coreService.preferLocaleCode(localeCode);
    flushMicrotasks();
  }

  it('should create an instance', () => {
    expect(pipe).toBeInstanceOf(IzTimePipe);
  });

  it('should correctly format PlainTime', fakeAsync(() => {
    let input = Temporal.PlainTime.from('05:04:32');

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('05:04:32');
    expect(pipe.convert(input, 'short')).toEqual('05:04');
    expect(pipe.convert(input, 'medium')).toEqual('05:04:32');
    expect(pipe.convert(input, 'long')).toEqual('05:04:32');
    expect(pipe.convert(input, {timeStyle: 'short'})).toEqual('05:04');
    expect(pipe.convert(input, {timeStyle: 'medium'})).toEqual('05:04:32');
    expect(pipe.convert(input, {hour: 'numeric'})).toEqual('05');
    expect(pipe.convert(input, {minute: 'numeric'})).toEqual('4');
    expect(pipe.convert(input, {second: 'numeric'})).toEqual('32');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric'})).toEqual('05:04');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('05:04:32');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('5:04:32 AM');
    expect(pipe.convert(input, 'short')).toEqual('5:04 AM');
    expect(pipe.convert(input, 'medium')).toEqual('5:04:32 AM');
    expect(pipe.convert(input, 'long')).toEqual('05:04:32 AM');
    expect(pipe.convert(input, {timeStyle: 'short'})).toEqual('5:04 AM');
    expect(pipe.convert(input, {timeStyle: 'medium'})).toEqual('5:04:32 AM');
    expect(pipe.convert(input, {hour: 'numeric'})).toEqual('5 AM');
    expect(pipe.convert(input, {minute: 'numeric'})).toEqual('4');
    expect(pipe.convert(input, {second: 'numeric'})).toEqual('32');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric'})).toEqual('5:04 AM');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('5:04:32 AM');

    preferLocale('ja-JP-u-ca-japanese');

    expect(pipe.convert(input)).toEqual('5:04:32');
    expect(pipe.convert(input, 'short')).toEqual('5:04');
    expect(pipe.convert(input, 'medium')).toEqual('5:04:32');
    expect(pipe.convert(input, 'long')).toEqual('05:04:32');
    expect(pipe.convert(input, {timeStyle: 'short'})).toEqual('5:04');
    expect(pipe.convert(input, {timeStyle: 'medium'})).toEqual('5:04:32');
    expect(pipe.convert(input, {hour: 'numeric'})).toEqual('5時');
    expect(pipe.convert(input, {minute: 'numeric'})).toEqual('4');
    expect(pipe.convert(input, {second: 'numeric'})).toEqual('32');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric'})).toEqual('5:04');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('5:04:32');

    preferLocale('cs-CZ');

    expect(pipe.convert(input)).toEqual('5:04:32');
    expect(pipe.convert(input, 'short')).toEqual('5:04');
    expect(pipe.convert(input, 'medium')).toEqual('5:04:32');
    expect(pipe.convert(input, 'long')).toEqual('05:04:32');
    expect(pipe.convert(input, {timeStyle: 'short'})).toEqual('5:04');
    expect(pipe.convert(input, {timeStyle: 'medium'})).toEqual('5:04:32');
    expect(pipe.convert(input, {hour: 'numeric'})).toEqual('5');
    expect(pipe.convert(input, {minute: 'numeric'})).toEqual('4');
    expect(pipe.convert(input, {second: 'numeric'})).toEqual('32');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric'})).toEqual('5:04');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('5:04:32');
  }));

  it('should correctly format PlainDateTime', fakeAsync(() => {
    let input = Temporal.PlainDateTime.from('2012-08-02T05:04:32');

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('05:04:32');
    expect(pipe.convert(input, 'short')).toEqual('05:04');
    expect(pipe.convert(input, 'medium')).toEqual('05:04:32');
    expect(pipe.convert(input, 'long')).toEqual('05:04:32');
    expect(pipe.convert(input, {timeStyle: 'short'})).toEqual('05:04');
    expect(pipe.convert(input, {timeStyle: 'medium'})).toEqual('05:04:32');
    expect(pipe.convert(input, {hour: 'numeric'})).toEqual('05');
    expect(pipe.convert(input, {minute: 'numeric'})).toEqual('4');
    expect(pipe.convert(input, {second: 'numeric'})).toEqual('32');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric'})).toEqual('05:04');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('05:04:32');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('5:04:32 AM');
    expect(pipe.convert(input, 'short')).toEqual('5:04 AM');
    expect(pipe.convert(input, 'medium')).toEqual('5:04:32 AM');
    expect(pipe.convert(input, 'long')).toEqual('05:04:32 AM');
    expect(pipe.convert(input, {timeStyle: 'short'})).toEqual('5:04 AM');
    expect(pipe.convert(input, {timeStyle: 'medium'})).toEqual('5:04:32 AM');
    expect(pipe.convert(input, {hour: 'numeric'})).toEqual('5 AM');
    expect(pipe.convert(input, {minute: 'numeric'})).toEqual('4');
    expect(pipe.convert(input, {second: 'numeric'})).toEqual('32');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric'})).toEqual('5:04 AM');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('5:04:32 AM');

    preferLocale('ja-JP-u-ca-japanese');

    expect(pipe.convert(input)).toEqual('5:04:32');
    expect(pipe.convert(input, 'short')).toEqual('5:04');
    expect(pipe.convert(input, 'medium')).toEqual('5:04:32');
    expect(pipe.convert(input, 'long')).toEqual('05:04:32');
    expect(pipe.convert(input, {timeStyle: 'short'})).toEqual('5:04');
    expect(pipe.convert(input, {timeStyle: 'medium'})).toEqual('5:04:32');
    expect(pipe.convert(input, {hour: 'numeric'})).toEqual('5時');
    expect(pipe.convert(input, {minute: 'numeric'})).toEqual('4');
    expect(pipe.convert(input, {second: 'numeric'})).toEqual('32');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric'})).toEqual('5:04');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('5:04:32');

    preferLocale('cs-CZ');

    expect(pipe.convert(input)).toEqual('5:04:32');
    expect(pipe.convert(input, 'short')).toEqual('5:04');
    expect(pipe.convert(input, 'medium')).toEqual('5:04:32');
    expect(pipe.convert(input, 'long')).toEqual('05:04:32');
    expect(pipe.convert(input, {timeStyle: 'short'})).toEqual('5:04');
    expect(pipe.convert(input, {timeStyle: 'medium'})).toEqual('5:04:32');
    expect(pipe.convert(input, {hour: 'numeric'})).toEqual('5');
    expect(pipe.convert(input, {minute: 'numeric'})).toEqual('4');
    expect(pipe.convert(input, {second: 'numeric'})).toEqual('32');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric'})).toEqual('5:04');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('5:04:32');
  }));
});

describe('IzZonedTimePipe', () => {
  let coreService: IzCoreService;
  let linkService: IzTemporalPluginLinkService;
  let pipe: IzZonedTimePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IzCoreModule.withLocales(localeDefinitions),
        IzTemporalModule,
      ],
    });
    coreService = TestBed.inject(IzCoreService);
    linkService = TestBed.inject(IzTemporalPluginLinkService);
    pipe = new IzZonedTimePipe(linkService, izTemporalDefaultFormats, coreService, changeDetectorRefMock);
  });

  function preferLocale(localeCode: IzLocaleCode): void {
    coreService.preferLocaleCode(localeCode);
    flushMicrotasks();
  }

  it('should create an instance', () => {
    expect(pipe).toBeInstanceOf(IzZonedTimePipe);
  });

  it('should correctly format ZonedDateTime', fakeAsync(() => {
    let input = Temporal.ZonedDateTime.from('2012-08-02T05:04:32+05:45[Asia/Kathmandu]');

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('05:04:32');
    expect(pipe.convert(input, 'short')).toEqual('05:04');
    expect(pipe.convert(input, 'medium')).toEqual('05:04:32');
    expect(pipe.convert(input, 'long')).toEqual('05:04:32');
    expect(pipe.convert(input, 'zonedShort')).toEqual('05:04 GMT+5:45');
    expect(pipe.convert(input, 'zonedMedium')).toEqual('5:04:32 GMT+5:45');
    expect(pipe.convert(input, 'zonedLong')).toEqual('05:04:32 Nepal Time');
    expect(pipe.convert(input, {timeStyle: 'short'})).toEqual('05:04');
    expect(pipe.convert(input, {timeStyle: 'medium'})).toEqual('05:04:32');
    expect(pipe.convert(input, {timeStyle: 'long'})).toEqual('05:04:32 GMT+5:45');
    expect(pipe.convert(input, {timeStyle: 'full'})).toEqual('05:04:32 Nepal Time');
    expect(pipe.convert(input, {hour: 'numeric'})).toEqual('05');
    expect(pipe.convert(input, {minute: 'numeric'})).toEqual('4');
    expect(pipe.convert(input, {second: 'numeric'})).toEqual('32');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric'})).toEqual('05:04');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', timeZoneName: 'short'})).toEqual('05:04 GMT+5:45');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('05:04:32');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'})).toEqual('5:04:32 GMT+5:45');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'long'})).toEqual('5:04:32 Nepal Time');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('5:04:32 AM');
    expect(pipe.convert(input, 'short')).toEqual('5:04 AM');
    expect(pipe.convert(input, 'medium')).toEqual('5:04:32 AM');
    expect(pipe.convert(input, 'long')).toEqual('05:04:32 AM');
    expect(pipe.convert(input, 'zonedShort')).toEqual('5:04 AM GMT+5:45');
    expect(pipe.convert(input, 'zonedMedium')).toEqual('5:04:32 AM GMT+5:45');
    expect(pipe.convert(input, 'zonedLong')).toEqual('05:04:32 AM Nepal Time');
    expect(pipe.convert(input, {timeStyle: 'short'})).toEqual('5:04 AM');
    expect(pipe.convert(input, {timeStyle: 'medium'})).toEqual('5:04:32 AM');
    expect(pipe.convert(input, {timeStyle: 'long'})).toEqual('5:04:32 AM GMT+5:45');
    expect(pipe.convert(input, {timeStyle: 'full'})).toEqual('5:04:32 AM Nepal Time');
    expect(pipe.convert(input, {hour: 'numeric'})).toEqual('5 AM');
    expect(pipe.convert(input, {minute: 'numeric'})).toEqual('4');
    expect(pipe.convert(input, {second: 'numeric'})).toEqual('32');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric'})).toEqual('5:04 AM');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', timeZoneName: 'short'})).toEqual('5:04 AM GMT+5:45');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('5:04:32 AM');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'})).toEqual('5:04:32 AM GMT+5:45');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'long'})).toEqual('5:04:32 AM Nepal Time');

    preferLocale('ja-JP-u-ca-japanese');

    expect(pipe.convert(input)).toEqual('5:04:32');
    expect(pipe.convert(input, 'short')).toEqual('5:04');
    expect(pipe.convert(input, 'medium')).toEqual('5:04:32');
    expect(pipe.convert(input, 'long')).toEqual('05:04:32');
    expect(pipe.convert(input, 'zonedShort')).toEqual('5:04 GMT+5:45');
    expect(pipe.convert(input, 'zonedMedium')).toEqual('5:04:32 GMT+5:45');
    expect(pipe.convert(input, 'zonedLong')).toEqual('05時04分32秒 ネパール時間');
    expect(pipe.convert(input, {timeStyle: 'short'})).toEqual('5:04');
    expect(pipe.convert(input, {timeStyle: 'medium'})).toEqual('5:04:32');
    expect(pipe.convert(input, {timeStyle: 'long'})).toEqual('5:04:32 GMT+5:45');
    expect(pipe.convert(input, {timeStyle: 'full'})).toEqual('5時04分32秒 ネパール時間');
    expect(pipe.convert(input, {hour: 'numeric'})).toEqual('5時');
    expect(pipe.convert(input, {minute: 'numeric'})).toEqual('4');
    expect(pipe.convert(input, {second: 'numeric'})).toEqual('32');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric'})).toEqual('5:04');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', timeZoneName: 'short'})).toEqual('5:04 GMT+5:45');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('5:04:32');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'})).toEqual('5:04:32 GMT+5:45');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'long'})).toEqual('5時04分32秒 ネパール時間');

    preferLocale('cs-CZ');

    expect(pipe.convert(input)).toEqual('5:04:32');
    expect(pipe.convert(input, 'short')).toEqual('5:04');
    expect(pipe.convert(input, 'medium')).toEqual('5:04:32');
    expect(pipe.convert(input, 'long')).toEqual('05:04:32');
    expect(pipe.convert(input, 'zonedShort')).toEqual('5:04 GMT+5:45');
    expect(pipe.convert(input, 'zonedMedium')).toEqual('5:04:32 GMT+5:45');
    expect(pipe.convert(input, 'zonedLong')).toEqual('05:04:32 Nepálský čas');
    expect(pipe.convert(input, {timeStyle: 'short'})).toEqual('5:04');
    expect(pipe.convert(input, {timeStyle: 'medium'})).toEqual('5:04:32');
    expect(pipe.convert(input, {timeStyle: 'long'})).toEqual('5:04:32 GMT+5:45');
    expect(pipe.convert(input, {timeStyle: 'full'})).toEqual('5:04:32 Nepálský čas');
    expect(pipe.convert(input, {hour: 'numeric'})).toEqual('5');
    expect(pipe.convert(input, {minute: 'numeric'})).toEqual('4');
    expect(pipe.convert(input, {second: 'numeric'})).toEqual('32');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric'})).toEqual('5:04');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', timeZoneName: 'short'})).toEqual('5:04 GMT+5:45');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('5:04:32');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'})).toEqual('5:04:32 GMT+5:45');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'long'})).toEqual('5:04:32 Nepálský čas');
  }));
});

describe('IzLocalTimePipe', () => {
  let coreService: IzCoreService;
  let linkService: IzTemporalPluginLinkService;
  let pipe: IzLocalTimePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IzCoreModule.withLocales(localeDefinitions),
        IzTemporalModule,
      ],
    });
    coreService = TestBed.inject(IzCoreService);
    linkService = TestBed.inject(IzTemporalPluginLinkService);
    pipe = new IzLocalTimePipe(linkService, izTemporalDefaultFormats, coreService, changeDetectorRefMock);
  });

  function preferLocale(localeCode: IzLocaleCode): void {
    coreService.preferLocaleCode(localeCode);
    flushMicrotasks();
  }

  it('should create an instance', () => {
    expect(pipe).toBeInstanceOf(IzLocalTimePipe);
  });

  it('should correctly format ZonedDateTime', fakeAsync(() => {
    let input = Temporal.ZonedDateTime.from('2012-08-02T05:04:32[Asia/Kathmandu]');

    // using internal property for tests only
    pipe.localTimezone = new Temporal.TimeZone('Pacific/Marquesas');

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('13:49:32');
    expect(pipe.convert(input, 'short')).toEqual('13:49');
    expect(pipe.convert(input, 'medium')).toEqual('13:49:32');
    expect(pipe.convert(input, 'long')).toEqual('13:49:32');
    expect(pipe.convert(input, 'zonedShort')).toEqual('13:49 GMT-9:30');
    expect(pipe.convert(input, 'zonedMedium')).toEqual('13:49:32 GMT-9:30');
    expect(pipe.convert(input, 'zonedLong')).toEqual('13:49:32 Marquesas Time');
    expect(pipe.convert(input, {timeStyle: 'short'})).toEqual('13:49');
    expect(pipe.convert(input, {timeStyle: 'medium'})).toEqual('13:49:32');
    expect(pipe.convert(input, {timeStyle: 'long'})).toEqual('13:49:32 GMT-9:30');
    expect(pipe.convert(input, {timeStyle: 'full'})).toEqual('13:49:32 Marquesas Time');
    expect(pipe.convert(input, {hour: 'numeric'})).toEqual('13');
    expect(pipe.convert(input, {minute: 'numeric'})).toEqual('49');
    expect(pipe.convert(input, {second: 'numeric'})).toEqual('32');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric'})).toEqual('13:49');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', timeZoneName: 'short'})).toEqual('13:49 GMT-9:30');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('13:49:32');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'})).toEqual('13:49:32 GMT-9:30');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'long'})).toEqual('13:49:32 Marquesas Time');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('1:49:32 PM');
    expect(pipe.convert(input, 'short')).toEqual('1:49 PM');
    expect(pipe.convert(input, 'medium')).toEqual('1:49:32 PM');
    expect(pipe.convert(input, 'long')).toEqual('01:49:32 PM');
    expect(pipe.convert(input, 'zonedShort')).toEqual('1:49 PM GMT-9:30');
    expect(pipe.convert(input, 'zonedMedium')).toEqual('1:49:32 PM GMT-9:30');
    expect(pipe.convert(input, 'zonedLong')).toEqual('01:49:32 PM Marquesas Time');
    expect(pipe.convert(input, {timeStyle: 'short'})).toEqual('1:49 PM');
    expect(pipe.convert(input, {timeStyle: 'medium'})).toEqual('1:49:32 PM');
    expect(pipe.convert(input, {timeStyle: 'long'})).toEqual('1:49:32 PM GMT-9:30');
    expect(pipe.convert(input, {timeStyle: 'full'})).toEqual('1:49:32 PM Marquesas Time');
    expect(pipe.convert(input, {hour: 'numeric'})).toEqual('1 PM');
    expect(pipe.convert(input, {minute: 'numeric'})).toEqual('49');
    expect(pipe.convert(input, {second: 'numeric'})).toEqual('32');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric'})).toEqual('1:49 PM');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', timeZoneName: 'short'})).toEqual('1:49 PM GMT-9:30');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('1:49:32 PM');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'})).toEqual('1:49:32 PM GMT-9:30');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'long'})).toEqual('1:49:32 PM Marquesas Time');

    preferLocale('ja-JP-u-ca-japanese');

    expect(pipe.convert(input)).toEqual('13:49:32');
    expect(pipe.convert(input, 'short')).toEqual('13:49');
    expect(pipe.convert(input, 'medium')).toEqual('13:49:32');
    expect(pipe.convert(input, 'long')).toEqual('13:49:32');
    expect(pipe.convert(input, 'zonedShort')).toEqual('13:49 GMT-9:30');
    expect(pipe.convert(input, 'zonedMedium')).toEqual('13:49:32 GMT-9:30');
    expect(pipe.convert(input, 'zonedLong')).toEqual('13時49分32秒 マルキーズ時間');
    expect(pipe.convert(input, {timeStyle: 'short'})).toEqual('13:49');
    expect(pipe.convert(input, {timeStyle: 'medium'})).toEqual('13:49:32');
    expect(pipe.convert(input, {timeStyle: 'long'})).toEqual('13:49:32 GMT-9:30');
    expect(pipe.convert(input, {timeStyle: 'full'})).toEqual('13時49分32秒 マルキーズ時間');
    expect(pipe.convert(input, {hour: 'numeric'})).toEqual('13時');
    expect(pipe.convert(input, {minute: 'numeric'})).toEqual('49');
    expect(pipe.convert(input, {second: 'numeric'})).toEqual('32');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric'})).toEqual('13:49');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', timeZoneName: 'short'})).toEqual('13:49 GMT-9:30');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('13:49:32');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'})).toEqual('13:49:32 GMT-9:30');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'long'})).toEqual('13時49分32秒 マルキーズ時間');

    preferLocale('cs-CZ');

    expect(pipe.convert(input)).toEqual('13:49:32');
    expect(pipe.convert(input, 'short')).toEqual('13:49');
    expect(pipe.convert(input, 'medium')).toEqual('13:49:32');
    expect(pipe.convert(input, 'long')).toEqual('13:49:32');
    expect(pipe.convert(input, 'zonedShort')).toEqual('13:49 GMT-9:30');
    expect(pipe.convert(input, 'zonedMedium')).toEqual('13:49:32 GMT-9:30');
    expect(pipe.convert(input, 'zonedLong')).toEqual('13:49:32 Markézský čas');
    expect(pipe.convert(input, {timeStyle: 'short'})).toEqual('13:49');
    expect(pipe.convert(input, {timeStyle: 'medium'})).toEqual('13:49:32');
    expect(pipe.convert(input, {timeStyle: 'long'})).toEqual('13:49:32 GMT-9:30');
    expect(pipe.convert(input, {timeStyle: 'full'})).toEqual('13:49:32 Markézský čas');
    expect(pipe.convert(input, {hour: 'numeric'})).toEqual('13');
    expect(pipe.convert(input, {minute: 'numeric'})).toEqual('49');
    expect(pipe.convert(input, {second: 'numeric'})).toEqual('32');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric'})).toEqual('13:49');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', timeZoneName: 'short'})).toEqual('13:49 GMT-9:30');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('13:49:32');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'})).toEqual('13:49:32 GMT-9:30');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'long'})).toEqual('13:49:32 Markézský čas');
  }));

  it('should correctly format Instant', fakeAsync(() => {
    let input = Temporal.Instant.from('2012-08-02T05:04:32+05:45');

    // using internal property for tests only
    pipe.localTimezone = new Temporal.TimeZone('Pacific/Marquesas');

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('13:49:32');
    expect(pipe.convert(input, 'short')).toEqual('13:49');
    expect(pipe.convert(input, 'medium')).toEqual('13:49:32');
    expect(pipe.convert(input, 'long')).toEqual('13:49:32');
    expect(pipe.convert(input, 'zonedShort')).toEqual('13:49 GMT-9:30');
    expect(pipe.convert(input, 'zonedMedium')).toEqual('13:49:32 GMT-9:30');
    expect(pipe.convert(input, 'zonedLong')).toEqual('13:49:32 Marquesas Time');
    expect(pipe.convert(input, {timeStyle: 'short'})).toEqual('13:49');
    expect(pipe.convert(input, {timeStyle: 'medium'})).toEqual('13:49:32');
    expect(pipe.convert(input, {timeStyle: 'long'})).toEqual('13:49:32 GMT-9:30');
    expect(pipe.convert(input, {timeStyle: 'full'})).toEqual('13:49:32 Marquesas Time');
    expect(pipe.convert(input, {hour: 'numeric'})).toEqual('13');
    expect(pipe.convert(input, {minute: 'numeric'})).toEqual('49');
    expect(pipe.convert(input, {second: 'numeric'})).toEqual('32');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric'})).toEqual('13:49');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', timeZoneName: 'short'})).toEqual('13:49 GMT-9:30');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('13:49:32');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'})).toEqual('13:49:32 GMT-9:30');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'long'})).toEqual('13:49:32 Marquesas Time');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('1:49:32 PM');
    expect(pipe.convert(input, 'short')).toEqual('1:49 PM');
    expect(pipe.convert(input, 'medium')).toEqual('1:49:32 PM');
    expect(pipe.convert(input, 'long')).toEqual('01:49:32 PM');
    expect(pipe.convert(input, 'zonedShort')).toEqual('1:49 PM GMT-9:30');
    expect(pipe.convert(input, 'zonedMedium')).toEqual('1:49:32 PM GMT-9:30');
    expect(pipe.convert(input, 'zonedLong')).toEqual('01:49:32 PM Marquesas Time');
    expect(pipe.convert(input, {timeStyle: 'short'})).toEqual('1:49 PM');
    expect(pipe.convert(input, {timeStyle: 'medium'})).toEqual('1:49:32 PM');
    expect(pipe.convert(input, {timeStyle: 'long'})).toEqual('1:49:32 PM GMT-9:30');
    expect(pipe.convert(input, {timeStyle: 'full'})).toEqual('1:49:32 PM Marquesas Time');
    expect(pipe.convert(input, {hour: 'numeric'})).toEqual('1 PM');
    expect(pipe.convert(input, {minute: 'numeric'})).toEqual('49');
    expect(pipe.convert(input, {second: 'numeric'})).toEqual('32');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric'})).toEqual('1:49 PM');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', timeZoneName: 'short'})).toEqual('1:49 PM GMT-9:30');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('1:49:32 PM');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'})).toEqual('1:49:32 PM GMT-9:30');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'long'})).toEqual('1:49:32 PM Marquesas Time');

    preferLocale('ja-JP-u-ca-japanese');

    expect(pipe.convert(input)).toEqual('13:49:32');
    expect(pipe.convert(input, 'short')).toEqual('13:49');
    expect(pipe.convert(input, 'medium')).toEqual('13:49:32');
    expect(pipe.convert(input, 'long')).toEqual('13:49:32');
    expect(pipe.convert(input, 'zonedShort')).toEqual('13:49 GMT-9:30');
    expect(pipe.convert(input, 'zonedMedium')).toEqual('13:49:32 GMT-9:30');
    expect(pipe.convert(input, 'zonedLong')).toEqual('13時49分32秒 マルキーズ時間');
    expect(pipe.convert(input, {timeStyle: 'short'})).toEqual('13:49');
    expect(pipe.convert(input, {timeStyle: 'medium'})).toEqual('13:49:32');
    expect(pipe.convert(input, {timeStyle: 'long'})).toEqual('13:49:32 GMT-9:30');
    expect(pipe.convert(input, {timeStyle: 'full'})).toEqual('13時49分32秒 マルキーズ時間');
    expect(pipe.convert(input, {hour: 'numeric'})).toEqual('13時');
    expect(pipe.convert(input, {minute: 'numeric'})).toEqual('49');
    expect(pipe.convert(input, {second: 'numeric'})).toEqual('32');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric'})).toEqual('13:49');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', timeZoneName: 'short'})).toEqual('13:49 GMT-9:30');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('13:49:32');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'})).toEqual('13:49:32 GMT-9:30');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'long'})).toEqual('13時49分32秒 マルキーズ時間');

    preferLocale('cs-CZ');

    expect(pipe.convert(input)).toEqual('13:49:32');
    expect(pipe.convert(input, 'short')).toEqual('13:49');
    expect(pipe.convert(input, 'medium')).toEqual('13:49:32');
    expect(pipe.convert(input, 'long')).toEqual('13:49:32');
    expect(pipe.convert(input, 'zonedShort')).toEqual('13:49 GMT-9:30');
    expect(pipe.convert(input, 'zonedMedium')).toEqual('13:49:32 GMT-9:30');
    expect(pipe.convert(input, 'zonedLong')).toEqual('13:49:32 Markézský čas');
    expect(pipe.convert(input, {timeStyle: 'short'})).toEqual('13:49');
    expect(pipe.convert(input, {timeStyle: 'medium'})).toEqual('13:49:32');
    expect(pipe.convert(input, {timeStyle: 'long'})).toEqual('13:49:32 GMT-9:30');
    expect(pipe.convert(input, {timeStyle: 'full'})).toEqual('13:49:32 Markézský čas');
    expect(pipe.convert(input, {hour: 'numeric'})).toEqual('13');
    expect(pipe.convert(input, {minute: 'numeric'})).toEqual('49');
    expect(pipe.convert(input, {second: 'numeric'})).toEqual('32');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric'})).toEqual('13:49');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', timeZoneName: 'short'})).toEqual('13:49 GMT-9:30');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric'})).toEqual('13:49:32');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'})).toEqual('13:49:32 GMT-9:30');
    expect(pipe.convert(input, {hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'long'})).toEqual('13:49:32 Markézský čas');
  }));
});
