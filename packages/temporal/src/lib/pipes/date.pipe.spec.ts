import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { IzCoreService, IzCoreModule, IzLocaleCode } from '@ization/core';

import { IzDatePipe, IzLocalDatePipe, IzZonedDatePipe } from './date.pipe';
import { changeDetectorRefMock } from './test-helpers/change-detector-ref.mock';
import { izTemporalDefaultFormats } from '../formats/formats.default';
import { localeDefinitions } from './test-helpers/locale-definitions';
import { IzTemporalPluginLinkService } from '../plugin-link.service';
import { IzTemporalModule } from '../temporal.module';

describe('IzDatePipe', () => {
  let coreService: IzCoreService;
  let linkService: IzTemporalPluginLinkService;
  let pipe: IzDatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IzCoreModule.withLocales(localeDefinitions),
        IzTemporalModule,
      ],
    });
    coreService = TestBed.inject(IzCoreService);
    linkService = TestBed.inject(IzTemporalPluginLinkService);
    pipe = new IzDatePipe(linkService, izTemporalDefaultFormats, coreService, changeDetectorRefMock);
  });

  function preferLocale(localeCode: IzLocaleCode): void {
    coreService.preferLocaleCode(localeCode);
    flushMicrotasks();
  }

  it('should create an instance', () => {
    expect(pipe).toBeInstanceOf(IzDatePipe);
  });

  it('should correctly format PlainDate', fakeAsync(() => {
    let input = Temporal.PlainDate.from('2012-08-02');

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('02/08/2012');
    expect(pipe.convert(input, 'short')).toEqual('02/08');
    expect(pipe.convert(input, 'medium')).toEqual('02/08/2012');
    expect(pipe.convert(input, 'long')).toEqual('Thursday, 2 August 2012');
    expect(pipe.convert(input, {dateStyle: 'short'})).toEqual('02/08/2012');
    expect(pipe.convert(input, {dateStyle: 'medium'})).toEqual('2 Aug 2012');
    expect(pipe.convert(input, {dateStyle: 'long'})).toEqual('2 August 2012');
    expect(pipe.convert(input, {dateStyle: 'full'})).toEqual('Thursday, 2 August 2012');
    expect(pipe.convert(input, {weekday: 'long'})).toEqual('Thursday');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('08/2012');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('August 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long'})).toEqual('Thursday, 02/08/2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric'})).toEqual('02/08/2012');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit', weekday: 'long'})).toEqual('Thursday, 02/08');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('02/08');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'})).toEqual('Thursday, 2 August 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric'})).toEqual('2 August 2012');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('8/2/2012');
    expect(pipe.convert(input, 'short')).toEqual('8/2');
    expect(pipe.convert(input, 'medium')).toEqual('8/2/2012');
    expect(pipe.convert(input, 'long')).toEqual('Thursday, August 2, 2012');
    expect(pipe.convert(input, {dateStyle: 'short'})).toEqual('8/2/12');
    expect(pipe.convert(input, {dateStyle: 'medium'})).toEqual('Aug 2, 2012');
    expect(pipe.convert(input, {dateStyle: 'long'})).toEqual('August 2, 2012');
    expect(pipe.convert(input, {dateStyle: 'full'})).toEqual('Thursday, August 2, 2012');
    expect(pipe.convert(input, {weekday: 'long'})).toEqual('Thursday');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('8/2012');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('August 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long'})).toEqual('Thursday, 8/2/2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric'})).toEqual('8/2/2012');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit', weekday: 'long'})).toEqual('Thursday, 08/02');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('08/02');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'})).toEqual('Thursday, August 2, 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric'})).toEqual('August 2, 2012');

    preferLocale('ja');

    expect(pipe.convert(input)).toEqual('2012/8/2');
    expect(pipe.convert(input, 'short')).toEqual('8/2');
    expect(pipe.convert(input, 'medium')).toEqual('2012/8/2');
    expect(pipe.convert(input, 'long')).toEqual('2012年8月2日木曜日');
    expect(pipe.convert(input, {dateStyle: 'short'})).toEqual('2012/08/02');
    expect(pipe.convert(input, {dateStyle: 'medium'})).toEqual('2012/08/02');
    expect(pipe.convert(input, {dateStyle: 'long'})).toEqual('2012年8月2日');
    expect(pipe.convert(input, {dateStyle: 'full'})).toEqual('2012年8月2日木曜日');
    expect(pipe.convert(input, {weekday: 'long'})).toEqual('木曜日');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('2012/8');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('2012年8月');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long'})).toEqual('2012/8/2木曜日');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric'})).toEqual('2012/8/2');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit', weekday: 'long'})).toEqual('08/02木曜日');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('08/02');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'})).toEqual('2012年8月2日木曜日');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric'})).toEqual('2012年8月2日');

    preferLocale('ja-JP-u-ca-japanese');

    expect(pipe.convert(input)).toEqual('H24/8/2');
    expect(pipe.convert(input, 'short')).toEqual('8/2');
    expect(pipe.convert(input, 'medium')).toEqual('H24/8/2');
    expect(pipe.convert(input, 'long')).toEqual('平成24年8月2日木曜日');
    expect(pipe.convert(input, {dateStyle: 'short'})).toEqual('H24/8/2');
    expect(pipe.convert(input, {dateStyle: 'medium'})).toEqual('平成24年8月2日');
    expect(pipe.convert(input, {dateStyle: 'long'})).toEqual('平成24年8月2日');
    expect(pipe.convert(input, {dateStyle: 'full'})).toEqual('平成24年8月2日木曜日');
    expect(pipe.convert(input, {weekday: 'long'})).toEqual('木曜日');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('H24/8');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('平成24年8月');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long'})).toEqual('H24/8/2木曜日');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric'})).toEqual('H24/8/2');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit', weekday: 'long'})).toEqual('08/02木曜日');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('08/02');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'})).toEqual('平成24年8月2日木曜日');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric'})).toEqual('平成24年8月2日');

    preferLocale('cs-CZ');

    expect(pipe.convert(input)).toEqual('2. 8. 2012');
    expect(pipe.convert(input, 'short')).toEqual('2. 8.');
    expect(pipe.convert(input, 'medium')).toEqual('2. 8. 2012');
    expect(pipe.convert(input, 'long')).toEqual('čtvrtek 2. srpna 2012');
    expect(pipe.convert(input, {dateStyle: 'short'})).toEqual('02.08.12');
    expect(pipe.convert(input, {dateStyle: 'medium'})).toEqual('2. 8. 2012');
    expect(pipe.convert(input, {dateStyle: 'long'})).toEqual('2. srpna 2012');
    expect(pipe.convert(input, {dateStyle: 'full'})).toEqual('čtvrtek 2. srpna 2012');
    expect(pipe.convert(input, {weekday: 'long'})).toEqual('čtvrtek');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('8/2012');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('srpen 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long'})).toEqual('čtvrtek 2. 8. 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric'})).toEqual('2. 8. 2012');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit', weekday: 'long'})).toEqual('čtvrtek 02. 08.');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('02. 08.');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'})).toEqual('čtvrtek 2. srpna 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric'})).toEqual('2. srpna 2012');

    preferLocale('cs-x-japan');

    expect(pipe.convert(input)).toEqual('2. 8. 24 H');
    expect(pipe.convert(input, 'short')).toEqual('2. 8.');
    expect(pipe.convert(input, 'medium')).toEqual('2. 8. 24 H');
    expect(pipe.convert(input, 'long')).toEqual('čtvrtek 2. srpna 24 Heisei');
    expect(pipe.convert(input, {dateStyle: 'short'})).toEqual('02.08.24 H');
    expect(pipe.convert(input, {dateStyle: 'medium'})).toEqual('2. 8. 24 Heisei');
    expect(pipe.convert(input, {dateStyle: 'long'})).toEqual('2. srpna 24 Heisei');
    expect(pipe.convert(input, {dateStyle: 'full'})).toEqual('čtvrtek, 2. srpna 24 Heisei');
    expect(pipe.convert(input, {weekday: 'long'})).toEqual('čtvrtek');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('8/24 H');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('srpen 24 Heisei');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long'})).toEqual('čtvrtek 2. 8. 24 H');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric'})).toEqual('2. 8. 24 H');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit', weekday: 'long'})).toEqual('čtvrtek 02. 08.');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('02. 08.');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'})).toEqual('čtvrtek 2. srpna 24 Heisei');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric'})).toEqual('2. srpna 24 Heisei');
  }));

  it('should correctly format PlainDateTime', fakeAsync(() => {
    let input = Temporal.PlainDateTime.from('2012-08-02T05:04:32');

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('02/08/2012');
    expect(pipe.convert(input, 'short')).toEqual('02/08');
    expect(pipe.convert(input, 'medium')).toEqual('02/08/2012');
    expect(pipe.convert(input, 'long')).toEqual('Thursday, 2 August 2012');
    expect(pipe.convert(input, {dateStyle: 'short'})).toEqual('02/08/2012');
    expect(pipe.convert(input, {dateStyle: 'medium'})).toEqual('2 Aug 2012');
    expect(pipe.convert(input, {dateStyle: 'long'})).toEqual('2 August 2012');
    expect(pipe.convert(input, {dateStyle: 'full'})).toEqual('Thursday, 2 August 2012');
    expect(pipe.convert(input, {weekday: 'long'})).toEqual('Thursday');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('08/2012');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('August 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long'})).toEqual('Thursday, 02/08/2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric'})).toEqual('02/08/2012');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit', weekday: 'long'})).toEqual('Thursday, 02/08');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('02/08');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'})).toEqual('Thursday, 2 August 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric'})).toEqual('2 August 2012');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('8/2/2012');
    expect(pipe.convert(input, 'short')).toEqual('8/2');
    expect(pipe.convert(input, 'medium')).toEqual('8/2/2012');
    expect(pipe.convert(input, 'long')).toEqual('Thursday, August 2, 2012');
    expect(pipe.convert(input, {dateStyle: 'short'})).toEqual('8/2/12');
    expect(pipe.convert(input, {dateStyle: 'medium'})).toEqual('Aug 2, 2012');
    expect(pipe.convert(input, {dateStyle: 'long'})).toEqual('August 2, 2012');
    expect(pipe.convert(input, {dateStyle: 'full'})).toEqual('Thursday, August 2, 2012');
    expect(pipe.convert(input, {weekday: 'long'})).toEqual('Thursday');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('8/2012');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('August 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long'})).toEqual('Thursday, 8/2/2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric'})).toEqual('8/2/2012');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit', weekday: 'long'})).toEqual('Thursday, 08/02');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('08/02');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'})).toEqual('Thursday, August 2, 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric'})).toEqual('August 2, 2012');

    preferLocale('ja');

    expect(pipe.convert(input)).toEqual('2012/8/2');
    expect(pipe.convert(input, 'short')).toEqual('8/2');
    expect(pipe.convert(input, 'medium')).toEqual('2012/8/2');
    expect(pipe.convert(input, 'long')).toEqual('2012年8月2日木曜日');
    expect(pipe.convert(input, {dateStyle: 'short'})).toEqual('2012/08/02');
    expect(pipe.convert(input, {dateStyle: 'medium'})).toEqual('2012/08/02');
    expect(pipe.convert(input, {dateStyle: 'long'})).toEqual('2012年8月2日');
    expect(pipe.convert(input, {dateStyle: 'full'})).toEqual('2012年8月2日木曜日');
    expect(pipe.convert(input, {weekday: 'long'})).toEqual('木曜日');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('2012/8');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('2012年8月');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long'})).toEqual('2012/8/2木曜日');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric'})).toEqual('2012/8/2');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit', weekday: 'long'})).toEqual('08/02木曜日');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('08/02');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'})).toEqual('2012年8月2日木曜日');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric'})).toEqual('2012年8月2日');

    preferLocale('ja-JP-u-ca-japanese');

    expect(pipe.convert(input)).toEqual('H24/8/2');
    expect(pipe.convert(input, 'short')).toEqual('8/2');
    expect(pipe.convert(input, 'medium')).toEqual('H24/8/2');
    expect(pipe.convert(input, 'long')).toEqual('平成24年8月2日木曜日');
    expect(pipe.convert(input, {dateStyle: 'short'})).toEqual('H24/8/2');
    expect(pipe.convert(input, {dateStyle: 'medium'})).toEqual('平成24年8月2日');
    expect(pipe.convert(input, {dateStyle: 'long'})).toEqual('平成24年8月2日');
    expect(pipe.convert(input, {dateStyle: 'full'})).toEqual('平成24年8月2日木曜日');
    expect(pipe.convert(input, {weekday: 'long'})).toEqual('木曜日');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('H24/8');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('平成24年8月');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long'})).toEqual('H24/8/2木曜日');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric'})).toEqual('H24/8/2');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit', weekday: 'long'})).toEqual('08/02木曜日');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('08/02');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'})).toEqual('平成24年8月2日木曜日');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric'})).toEqual('平成24年8月2日');

    preferLocale('cs-CZ');

    expect(pipe.convert(input)).toEqual('2. 8. 2012');
    expect(pipe.convert(input, 'short')).toEqual('2. 8.');
    expect(pipe.convert(input, 'medium')).toEqual('2. 8. 2012');
    expect(pipe.convert(input, 'long')).toEqual('čtvrtek 2. srpna 2012');
    expect(pipe.convert(input, {dateStyle: 'short'})).toEqual('02.08.12');
    expect(pipe.convert(input, {dateStyle: 'medium'})).toEqual('2. 8. 2012');
    expect(pipe.convert(input, {dateStyle: 'long'})).toEqual('2. srpna 2012');
    expect(pipe.convert(input, {dateStyle: 'full'})).toEqual('čtvrtek 2. srpna 2012');
    expect(pipe.convert(input, {weekday: 'long'})).toEqual('čtvrtek');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('8/2012');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('srpen 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long'})).toEqual('čtvrtek 2. 8. 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric'})).toEqual('2. 8. 2012');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit', weekday: 'long'})).toEqual('čtvrtek 02. 08.');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('02. 08.');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'})).toEqual('čtvrtek 2. srpna 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric'})).toEqual('2. srpna 2012');

    preferLocale('cs-x-japan');

    expect(pipe.convert(input)).toEqual('2. 8. 24 H');
    expect(pipe.convert(input, 'short')).toEqual('2. 8.');
    expect(pipe.convert(input, 'medium')).toEqual('2. 8. 24 H');
    expect(pipe.convert(input, 'long')).toEqual('čtvrtek 2. srpna 24 Heisei');
    expect(pipe.convert(input, {dateStyle: 'short'})).toEqual('02.08.24 H');
    expect(pipe.convert(input, {dateStyle: 'medium'})).toEqual('2. 8. 24 Heisei');
    expect(pipe.convert(input, {dateStyle: 'long'})).toEqual('2. srpna 24 Heisei');
    expect(pipe.convert(input, {dateStyle: 'full'})).toEqual('čtvrtek, 2. srpna 24 Heisei');
    expect(pipe.convert(input, {weekday: 'long'})).toEqual('čtvrtek');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('8/24 H');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('srpen 24 Heisei');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long'})).toEqual('čtvrtek 2. 8. 24 H');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric'})).toEqual('2. 8. 24 H');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit', weekday: 'long'})).toEqual('čtvrtek 02. 08.');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('02. 08.');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'})).toEqual('čtvrtek 2. srpna 24 Heisei');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric'})).toEqual('2. srpna 24 Heisei');
  }));
});

describe('IzZonedDatePipe', () => {
  let coreService: IzCoreService;
  let linkService: IzTemporalPluginLinkService;
  let pipe: IzZonedDatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IzCoreModule.withLocales(localeDefinitions),
        IzTemporalModule,
      ],
    });
    coreService = TestBed.inject(IzCoreService);
    linkService = TestBed.inject(IzTemporalPluginLinkService);
    pipe = new IzZonedDatePipe(linkService, izTemporalDefaultFormats, coreService, changeDetectorRefMock);
  });

  function preferLocale(localeCode: IzLocaleCode): void {
    coreService.preferLocaleCode(localeCode);
    flushMicrotasks();
  }

  it('should create an instance', () => {
    expect(pipe).toBeInstanceOf(IzZonedDatePipe);
  });

  it('should correctly format ZonedDateTime', fakeAsync(() => {
    let input = Temporal.ZonedDateTime.from('2012-08-02T05:04:32+05:45[Asia/Kathmandu]');

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('02/08/2012');
    expect(pipe.convert(input, 'short')).toEqual('02/08');
    expect(pipe.convert(input, 'medium')).toEqual('02/08/2012');
    expect(pipe.convert(input, 'long')).toEqual('Thursday, 2 August 2012');
    expect(pipe.convert(input, {dateStyle: 'short'})).toEqual('02/08/2012');
    expect(pipe.convert(input, {dateStyle: 'medium'})).toEqual('2 Aug 2012');
    expect(pipe.convert(input, {dateStyle: 'long'})).toEqual('2 August 2012');
    expect(pipe.convert(input, {dateStyle: 'full'})).toEqual('Thursday, 2 August 2012');
    expect(pipe.convert(input, {weekday: 'long'})).toEqual('Thursday');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('08/2012');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('August 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long'})).toEqual('Thursday, 02/08/2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric'})).toEqual('02/08/2012');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit', weekday: 'long'})).toEqual('Thursday, 02/08');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('02/08');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'})).toEqual('Thursday, 2 August 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric'})).toEqual('2 August 2012');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('8/2/2012');
    expect(pipe.convert(input, 'short')).toEqual('8/2');
    expect(pipe.convert(input, 'medium')).toEqual('8/2/2012');
    expect(pipe.convert(input, 'long')).toEqual('Thursday, August 2, 2012');
    expect(pipe.convert(input, {dateStyle: 'short'})).toEqual('8/2/12');
    expect(pipe.convert(input, {dateStyle: 'medium'})).toEqual('Aug 2, 2012');
    expect(pipe.convert(input, {dateStyle: 'long'})).toEqual('August 2, 2012');
    expect(pipe.convert(input, {dateStyle: 'full'})).toEqual('Thursday, August 2, 2012');
    expect(pipe.convert(input, {weekday: 'long'})).toEqual('Thursday');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('8/2012');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('August 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long'})).toEqual('Thursday, 8/2/2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric'})).toEqual('8/2/2012');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit', weekday: 'long'})).toEqual('Thursday, 08/02');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('08/02');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'})).toEqual('Thursday, August 2, 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric'})).toEqual('August 2, 2012');

    preferLocale('ja');

    expect(pipe.convert(input)).toEqual('2012/8/2');
    expect(pipe.convert(input, 'short')).toEqual('8/2');
    expect(pipe.convert(input, 'medium')).toEqual('2012/8/2');
    expect(pipe.convert(input, 'long')).toEqual('2012年8月2日木曜日');
    expect(pipe.convert(input, {dateStyle: 'short'})).toEqual('2012/08/02');
    expect(pipe.convert(input, {dateStyle: 'medium'})).toEqual('2012/08/02');
    expect(pipe.convert(input, {dateStyle: 'long'})).toEqual('2012年8月2日');
    expect(pipe.convert(input, {dateStyle: 'full'})).toEqual('2012年8月2日木曜日');
    expect(pipe.convert(input, {weekday: 'long'})).toEqual('木曜日');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('2012/8');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('2012年8月');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long'})).toEqual('2012/8/2木曜日');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric'})).toEqual('2012/8/2');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit', weekday: 'long'})).toEqual('08/02木曜日');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('08/02');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'})).toEqual('2012年8月2日木曜日');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric'})).toEqual('2012年8月2日');

    preferLocale('ja-JP-u-ca-japanese');

    expect(pipe.convert(input)).toEqual('H24/8/2');
    expect(pipe.convert(input, 'short')).toEqual('8/2');
    expect(pipe.convert(input, 'medium')).toEqual('H24/8/2');
    expect(pipe.convert(input, 'long')).toEqual('平成24年8月2日木曜日');
    expect(pipe.convert(input, {dateStyle: 'short'})).toEqual('H24/8/2');
    expect(pipe.convert(input, {dateStyle: 'medium'})).toEqual('平成24年8月2日');
    expect(pipe.convert(input, {dateStyle: 'long'})).toEqual('平成24年8月2日');
    expect(pipe.convert(input, {dateStyle: 'full'})).toEqual('平成24年8月2日木曜日');
    expect(pipe.convert(input, {weekday: 'long'})).toEqual('木曜日');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('H24/8');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('平成24年8月');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long'})).toEqual('H24/8/2木曜日');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric'})).toEqual('H24/8/2');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit', weekday: 'long'})).toEqual('08/02木曜日');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('08/02');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'})).toEqual('平成24年8月2日木曜日');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric'})).toEqual('平成24年8月2日');

    preferLocale('cs-CZ');

    expect(pipe.convert(input)).toEqual('2. 8. 2012');
    expect(pipe.convert(input, 'short')).toEqual('2. 8.');
    expect(pipe.convert(input, 'medium')).toEqual('2. 8. 2012');
    expect(pipe.convert(input, 'long')).toEqual('čtvrtek 2. srpna 2012');
    expect(pipe.convert(input, {dateStyle: 'short'})).toEqual('02.08.12');
    expect(pipe.convert(input, {dateStyle: 'medium'})).toEqual('2. 8. 2012');
    expect(pipe.convert(input, {dateStyle: 'long'})).toEqual('2. srpna 2012');
    expect(pipe.convert(input, {dateStyle: 'full'})).toEqual('čtvrtek 2. srpna 2012');
    expect(pipe.convert(input, {weekday: 'long'})).toEqual('čtvrtek');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('8/2012');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('srpen 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long'})).toEqual('čtvrtek 2. 8. 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric'})).toEqual('2. 8. 2012');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit', weekday: 'long'})).toEqual('čtvrtek 02. 08.');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('02. 08.');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'})).toEqual('čtvrtek 2. srpna 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric'})).toEqual('2. srpna 2012');

    preferLocale('cs-x-japan');

    expect(pipe.convert(input)).toEqual('2. 8. 24 H');
    expect(pipe.convert(input, 'short')).toEqual('2. 8.');
    expect(pipe.convert(input, 'medium')).toEqual('2. 8. 24 H');
    expect(pipe.convert(input, 'long')).toEqual('čtvrtek 2. srpna 24 Heisei');
    expect(pipe.convert(input, {dateStyle: 'short'})).toEqual('02.08.24 H');
    expect(pipe.convert(input, {dateStyle: 'medium'})).toEqual('2. 8. 24 Heisei');
    expect(pipe.convert(input, {dateStyle: 'long'})).toEqual('2. srpna 24 Heisei');
    expect(pipe.convert(input, {dateStyle: 'full'})).toEqual('čtvrtek, 2. srpna 24 Heisei');
    expect(pipe.convert(input, {weekday: 'long'})).toEqual('čtvrtek');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('8/24 H');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('srpen 24 Heisei');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long'})).toEqual('čtvrtek 2. 8. 24 H');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric'})).toEqual('2. 8. 24 H');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit', weekday: 'long'})).toEqual('čtvrtek 02. 08.');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('02. 08.');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'})).toEqual('čtvrtek 2. srpna 24 Heisei');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric'})).toEqual('2. srpna 24 Heisei');
  }));
});

describe('IzLocalDatePipe', () => {
  let coreService: IzCoreService;
  let linkService: IzTemporalPluginLinkService;
  let pipe: IzLocalDatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IzCoreModule.withLocales(localeDefinitions),
        IzTemporalModule,
      ],
    });
    coreService = TestBed.inject(IzCoreService);
    linkService = TestBed.inject(IzTemporalPluginLinkService);
    pipe = new IzLocalDatePipe(linkService, izTemporalDefaultFormats, coreService, changeDetectorRefMock);
  });

  function preferLocale(localeCode: IzLocaleCode): void {
    coreService.preferLocaleCode(localeCode);
    flushMicrotasks();
  }

  it('should create an instance', () => {
    expect(pipe).toBeInstanceOf(IzLocalDatePipe);
  });

  it('should correctly format ZonedDateTime', fakeAsync(() => {
    let input = Temporal.ZonedDateTime.from('2012-08-02T05:04:32+05:45[Asia/Kathmandu]');

    // using internal property for tests only
    pipe.localTimezone = new Temporal.TimeZone('Pacific/Marquesas');

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('01/08/2012');
    expect(pipe.convert(input, 'short')).toEqual('01/08');
    expect(pipe.convert(input, 'medium')).toEqual('01/08/2012');
    expect(pipe.convert(input, 'long')).toEqual('Wednesday, 1 August 2012');
    expect(pipe.convert(input, {dateStyle: 'short'})).toEqual('01/08/2012');
    expect(pipe.convert(input, {dateStyle: 'medium'})).toEqual('1 Aug 2012');
    expect(pipe.convert(input, {dateStyle: 'long'})).toEqual('1 August 2012');
    expect(pipe.convert(input, {dateStyle: 'full'})).toEqual('Wednesday, 1 August 2012');
    expect(pipe.convert(input, {weekday: 'long'})).toEqual('Wednesday');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('08/2012');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('August 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long'})).toEqual('Wednesday, 01/08/2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric'})).toEqual('01/08/2012');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit', weekday: 'long'})).toEqual('Wednesday, 01/08');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('01/08');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'})).toEqual('Wednesday, 1 August 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric'})).toEqual('1 August 2012');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('8/1/2012');
    expect(pipe.convert(input, 'short')).toEqual('8/1');
    expect(pipe.convert(input, 'medium')).toEqual('8/1/2012');
    expect(pipe.convert(input, 'long')).toEqual('Wednesday, August 1, 2012');
    expect(pipe.convert(input, {dateStyle: 'short'})).toEqual('8/1/12');
    expect(pipe.convert(input, {dateStyle: 'medium'})).toEqual('Aug 1, 2012');
    expect(pipe.convert(input, {dateStyle: 'long'})).toEqual('August 1, 2012');
    expect(pipe.convert(input, {dateStyle: 'full'})).toEqual('Wednesday, August 1, 2012');
    expect(pipe.convert(input, {weekday: 'long'})).toEqual('Wednesday');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('8/2012');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('August 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long'})).toEqual('Wednesday, 8/1/2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric'})).toEqual('8/1/2012');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit', weekday: 'long'})).toEqual('Wednesday, 08/01');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('08/01');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'})).toEqual('Wednesday, August 1, 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric'})).toEqual('August 1, 2012');

    preferLocale('ja');

    expect(pipe.convert(input)).toEqual('2012/8/1');
    expect(pipe.convert(input, 'short')).toEqual('8/1');
    expect(pipe.convert(input, 'medium')).toEqual('2012/8/1');
    expect(pipe.convert(input, 'long')).toEqual('2012年8月1日水曜日');
    expect(pipe.convert(input, {dateStyle: 'short'})).toEqual('2012/08/01');
    expect(pipe.convert(input, {dateStyle: 'medium'})).toEqual('2012/08/01');
    expect(pipe.convert(input, {dateStyle: 'long'})).toEqual('2012年8月1日');
    expect(pipe.convert(input, {dateStyle: 'full'})).toEqual('2012年8月1日水曜日');
    expect(pipe.convert(input, {weekday: 'long'})).toEqual('水曜日');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('2012/8');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('2012年8月');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long'})).toEqual('2012/8/1水曜日');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric'})).toEqual('2012/8/1');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit', weekday: 'long'})).toEqual('08/01水曜日');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('08/01');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'})).toEqual('2012年8月1日水曜日');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric'})).toEqual('2012年8月1日');

    preferLocale('ja-JP-u-ca-japanese');

    expect(pipe.convert(input)).toEqual('H24/8/1');
    expect(pipe.convert(input, 'short')).toEqual('8/1');
    expect(pipe.convert(input, 'medium')).toEqual('H24/8/1');
    expect(pipe.convert(input, 'long')).toEqual('平成24年8月1日水曜日');
    expect(pipe.convert(input, {dateStyle: 'short'})).toEqual('H24/8/1');
    expect(pipe.convert(input, {dateStyle: 'medium'})).toEqual('平成24年8月1日');
    expect(pipe.convert(input, {dateStyle: 'long'})).toEqual('平成24年8月1日');
    expect(pipe.convert(input, {dateStyle: 'full'})).toEqual('平成24年8月1日水曜日');
    expect(pipe.convert(input, {weekday: 'long'})).toEqual('水曜日');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('H24/8');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('平成24年8月');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long'})).toEqual('H24/8/1水曜日');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric'})).toEqual('H24/8/1');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit', weekday: 'long'})).toEqual('08/01水曜日');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('08/01');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'})).toEqual('平成24年8月1日水曜日');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric'})).toEqual('平成24年8月1日');

    preferLocale('cs-CZ');

    expect(pipe.convert(input)).toEqual('1. 8. 2012');
    expect(pipe.convert(input, 'short')).toEqual('1. 8.');
    expect(pipe.convert(input, 'medium')).toEqual('1. 8. 2012');
    expect(pipe.convert(input, 'long')).toEqual('středa 1. srpna 2012');
    expect(pipe.convert(input, {dateStyle: 'short'})).toEqual('01.08.12');
    expect(pipe.convert(input, {dateStyle: 'medium'})).toEqual('1. 8. 2012');
    expect(pipe.convert(input, {dateStyle: 'long'})).toEqual('1. srpna 2012');
    expect(pipe.convert(input, {dateStyle: 'full'})).toEqual('středa 1. srpna 2012');
    expect(pipe.convert(input, {weekday: 'long'})).toEqual('středa');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('8/2012');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('srpen 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long'})).toEqual('středa 1. 8. 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric'})).toEqual('1. 8. 2012');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit', weekday: 'long'})).toEqual('středa 01. 08.');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('01. 08.');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'})).toEqual('středa 1. srpna 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric'})).toEqual('1. srpna 2012');

    preferLocale('cs-x-japan');

    expect(pipe.convert(input)).toEqual('1. 8. 24 H');
    expect(pipe.convert(input, 'short')).toEqual('1. 8.');
    expect(pipe.convert(input, 'medium')).toEqual('1. 8. 24 H');
    expect(pipe.convert(input, 'long')).toEqual('středa 1. srpna 24 Heisei');
    expect(pipe.convert(input, {dateStyle: 'short'})).toEqual('01.08.24 H');
    expect(pipe.convert(input, {dateStyle: 'medium'})).toEqual('1. 8. 24 Heisei');
    expect(pipe.convert(input, {dateStyle: 'long'})).toEqual('1. srpna 24 Heisei');
    expect(pipe.convert(input, {dateStyle: 'full'})).toEqual('středa, 1. srpna 24 Heisei');
    expect(pipe.convert(input, {weekday: 'long'})).toEqual('středa');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('8/24 H');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('srpen 24 Heisei');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long'})).toEqual('středa 1. 8. 24 H');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric'})).toEqual('1. 8. 24 H');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit', weekday: 'long'})).toEqual('středa 01. 08.');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('01. 08.');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'})).toEqual('středa 1. srpna 24 Heisei');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric'})).toEqual('1. srpna 24 Heisei');
  }));

  it('should correctly format Instant', fakeAsync(() => {
    let input = Temporal.Instant.from('2012-08-02T05:04:32+05:45');

    // using internal property for tests only
    pipe.localTimezone = new Temporal.TimeZone('Pacific/Marquesas');

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('01/08/2012');
    expect(pipe.convert(input, 'short')).toEqual('01/08');
    expect(pipe.convert(input, 'medium')).toEqual('01/08/2012');
    expect(pipe.convert(input, 'long')).toEqual('Wednesday, 1 August 2012');
    expect(pipe.convert(input, {dateStyle: 'short'})).toEqual('01/08/2012');
    expect(pipe.convert(input, {dateStyle: 'medium'})).toEqual('1 Aug 2012');
    expect(pipe.convert(input, {dateStyle: 'long'})).toEqual('1 August 2012');
    expect(pipe.convert(input, {dateStyle: 'full'})).toEqual('Wednesday, 1 August 2012');
    expect(pipe.convert(input, {weekday: 'long'})).toEqual('Wednesday');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('08/2012');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('August 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long'})).toEqual('Wednesday, 01/08/2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric'})).toEqual('01/08/2012');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit', weekday: 'long'})).toEqual('Wednesday, 01/08');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('01/08');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'})).toEqual('Wednesday, 1 August 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric'})).toEqual('1 August 2012');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('8/1/2012');
    expect(pipe.convert(input, 'short')).toEqual('8/1');
    expect(pipe.convert(input, 'medium')).toEqual('8/1/2012');
    expect(pipe.convert(input, 'long')).toEqual('Wednesday, August 1, 2012');
    expect(pipe.convert(input, {dateStyle: 'short'})).toEqual('8/1/12');
    expect(pipe.convert(input, {dateStyle: 'medium'})).toEqual('Aug 1, 2012');
    expect(pipe.convert(input, {dateStyle: 'long'})).toEqual('August 1, 2012');
    expect(pipe.convert(input, {dateStyle: 'full'})).toEqual('Wednesday, August 1, 2012');
    expect(pipe.convert(input, {weekday: 'long'})).toEqual('Wednesday');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('8/2012');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('August 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long'})).toEqual('Wednesday, 8/1/2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric'})).toEqual('8/1/2012');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit', weekday: 'long'})).toEqual('Wednesday, 08/01');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('08/01');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'})).toEqual('Wednesday, August 1, 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric'})).toEqual('August 1, 2012');

    preferLocale('ja');

    expect(pipe.convert(input)).toEqual('2012/8/1');
    expect(pipe.convert(input, 'short')).toEqual('8/1');
    expect(pipe.convert(input, 'medium')).toEqual('2012/8/1');
    expect(pipe.convert(input, 'long')).toEqual('2012年8月1日水曜日');
    expect(pipe.convert(input, {dateStyle: 'short'})).toEqual('2012/08/01');
    expect(pipe.convert(input, {dateStyle: 'medium'})).toEqual('2012/08/01');
    expect(pipe.convert(input, {dateStyle: 'long'})).toEqual('2012年8月1日');
    expect(pipe.convert(input, {dateStyle: 'full'})).toEqual('2012年8月1日水曜日');
    expect(pipe.convert(input, {weekday: 'long'})).toEqual('水曜日');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('2012/8');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('2012年8月');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long'})).toEqual('2012/8/1水曜日');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric'})).toEqual('2012/8/1');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit', weekday: 'long'})).toEqual('08/01水曜日');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('08/01');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'})).toEqual('2012年8月1日水曜日');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric'})).toEqual('2012年8月1日');

    preferLocale('ja-JP-u-ca-japanese');

    expect(pipe.convert(input)).toEqual('H24/8/1');
    expect(pipe.convert(input, 'short')).toEqual('8/1');
    expect(pipe.convert(input, 'medium')).toEqual('H24/8/1');
    expect(pipe.convert(input, 'long')).toEqual('平成24年8月1日水曜日');
    expect(pipe.convert(input, {dateStyle: 'short'})).toEqual('H24/8/1');
    expect(pipe.convert(input, {dateStyle: 'medium'})).toEqual('平成24年8月1日');
    expect(pipe.convert(input, {dateStyle: 'long'})).toEqual('平成24年8月1日');
    expect(pipe.convert(input, {dateStyle: 'full'})).toEqual('平成24年8月1日水曜日');
    expect(pipe.convert(input, {weekday: 'long'})).toEqual('水曜日');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('H24/8');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('平成24年8月');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long'})).toEqual('H24/8/1水曜日');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric'})).toEqual('H24/8/1');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit', weekday: 'long'})).toEqual('08/01水曜日');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('08/01');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'})).toEqual('平成24年8月1日水曜日');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric'})).toEqual('平成24年8月1日');

    preferLocale('cs-CZ');

    expect(pipe.convert(input)).toEqual('1. 8. 2012');
    expect(pipe.convert(input, 'short')).toEqual('1. 8.');
    expect(pipe.convert(input, 'medium')).toEqual('1. 8. 2012');
    expect(pipe.convert(input, 'long')).toEqual('středa 1. srpna 2012');
    expect(pipe.convert(input, {dateStyle: 'short'})).toEqual('01.08.12');
    expect(pipe.convert(input, {dateStyle: 'medium'})).toEqual('1. 8. 2012');
    expect(pipe.convert(input, {dateStyle: 'long'})).toEqual('1. srpna 2012');
    expect(pipe.convert(input, {dateStyle: 'full'})).toEqual('středa 1. srpna 2012');
    expect(pipe.convert(input, {weekday: 'long'})).toEqual('středa');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('8/2012');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('srpen 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long'})).toEqual('středa 1. 8. 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric'})).toEqual('1. 8. 2012');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit', weekday: 'long'})).toEqual('středa 01. 08.');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('01. 08.');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'})).toEqual('středa 1. srpna 2012');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric'})).toEqual('1. srpna 2012');

    preferLocale('cs-x-japan');

    expect(pipe.convert(input)).toEqual('1. 8. 24 H');
    expect(pipe.convert(input, 'short')).toEqual('1. 8.');
    expect(pipe.convert(input, 'medium')).toEqual('1. 8. 24 H');
    expect(pipe.convert(input, 'long')).toEqual('středa 1. srpna 24 Heisei');
    expect(pipe.convert(input, {dateStyle: 'short'})).toEqual('01.08.24 H');
    expect(pipe.convert(input, {dateStyle: 'medium'})).toEqual('1. 8. 24 Heisei');
    expect(pipe.convert(input, {dateStyle: 'long'})).toEqual('1. srpna 24 Heisei');
    expect(pipe.convert(input, {dateStyle: 'full'})).toEqual('středa, 1. srpna 24 Heisei');
    expect(pipe.convert(input, {weekday: 'long'})).toEqual('středa');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('8/24 H');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('srpen 24 Heisei');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long'})).toEqual('středa 1. 8. 24 H');
    expect(pipe.convert(input, {day: 'numeric', month: 'numeric', year: 'numeric'})).toEqual('1. 8. 24 H');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit', weekday: 'long'})).toEqual('středa 01. 08.');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('01. 08.');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'})).toEqual('středa 1. srpna 24 Heisei');
    expect(pipe.convert(input, {day: 'numeric', month: 'long', year: 'numeric'})).toEqual('1. srpna 24 Heisei');
  }));
});
