import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { IzCoreService, IzCoreModule, IzLocaleCode } from '@ization/core';

import { IzMonthDayPipe } from './month-day.pipe';
import { changeDetectorRefMock } from './test-helpers/change-detector-ref.mock';
import { izTemporalDefaultFormats } from '../formats/formats.default';
import { localeDefinitions } from './test-helpers/locale-definitions';
import { IzTemporalPluginLinkService } from '../plugin-link.service';
import { IzTemporalModule } from '../temporal.module';

describe('IzMonthDayPipe', () => {
  let coreService: IzCoreService;
  let linkService: IzTemporalPluginLinkService;
  let pipe: IzMonthDayPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IzCoreModule.withLocales(localeDefinitions),
        IzTemporalModule,
      ],
    });
    coreService = TestBed.inject(IzCoreService);
    linkService = TestBed.inject(IzTemporalPluginLinkService);
    pipe = new IzMonthDayPipe(linkService, izTemporalDefaultFormats, coreService, changeDetectorRefMock);
  });

  function preferLocale(localeCode: IzLocaleCode): void {
    coreService.preferLocaleCode(localeCode);
    flushMicrotasks();
  }

  it('should create an instance', () => {
    expect(pipe).toBeInstanceOf(IzMonthDayPipe);
  });

  it('should correctly format PlainMonthDay', fakeAsync(() => {
    let input = Temporal.PlainMonthDay.from('--08-02');

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('2 Aug');
    expect(pipe.convert(input, 'short')).toEqual('02/08');
    expect(pipe.convert(input, 'medium')).toEqual('2 Aug');
    expect(pipe.convert(input, 'long')).toEqual('2 August');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('02/08');
    expect(pipe.convert(input, {day: 'numeric', month: 'long'})).toEqual('2 August');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('Aug 2');
    expect(pipe.convert(input, 'short')).toEqual('8/2');
    expect(pipe.convert(input, 'medium')).toEqual('Aug 2');
    expect(pipe.convert(input, 'long')).toEqual('August 2');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('08/02');
    expect(pipe.convert(input, {day: 'numeric', month: 'long'})).toEqual('August 2');

    preferLocale('ja');

    expect(pipe.convert(input)).toEqual('8月2日');
    expect(pipe.convert(input, 'short')).toEqual('8/2');
    expect(pipe.convert(input, 'medium')).toEqual('8月2日');
    expect(pipe.convert(input, 'long')).toEqual('8月2日');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('08/02');
    expect(pipe.convert(input, {day: 'numeric', month: 'long'})).toEqual('8月2日');

    preferLocale('ja-JP-u-ca-japanese');

    expect(pipe.convert(input)).toEqual('8月2日');
    expect(pipe.convert(input, 'short')).toEqual('8/2');
    expect(pipe.convert(input, 'medium')).toEqual('8月2日');
    expect(pipe.convert(input, 'long')).toEqual('8月2日');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('08/02');
    expect(pipe.convert(input, {day: 'numeric', month: 'long'})).toEqual('8月2日');

    preferLocale('cs-CZ');

    expect(pipe.convert(input)).toEqual('2. 8.');
    expect(pipe.convert(input, 'short')).toEqual('2. 8.');
    expect(pipe.convert(input, 'medium')).toEqual('2. 8.');
    expect(pipe.convert(input, 'long')).toEqual('2. srpna');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('02. 08.');
    expect(pipe.convert(input, {day: 'numeric', month: 'long'})).toEqual('2. srpna');

    preferLocale('cs-x-japan');

    expect(pipe.convert(input)).toEqual('2. 8.');
    expect(pipe.convert(input, 'short')).toEqual('2. 8.');
    expect(pipe.convert(input, 'medium')).toEqual('2. 8.');
    expect(pipe.convert(input, 'long')).toEqual('2. srpna');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('02. 08.');
    expect(pipe.convert(input, {day: 'numeric', month: 'long'})).toEqual('2. srpna');
  }));

  it('should correctly format PlainDate', fakeAsync(() => {
    let input = Temporal.PlainDate.from('2012-08-02');

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('2 Aug');
    expect(pipe.convert(input, 'short')).toEqual('02/08');
    expect(pipe.convert(input, 'medium')).toEqual('2 Aug');
    expect(pipe.convert(input, 'long')).toEqual('2 August');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('02/08');
    expect(pipe.convert(input, {day: 'numeric', month: 'long'})).toEqual('2 August');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('Aug 2');
    expect(pipe.convert(input, 'short')).toEqual('8/2');
    expect(pipe.convert(input, 'medium')).toEqual('Aug 2');
    expect(pipe.convert(input, 'long')).toEqual('August 2');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('08/02');
    expect(pipe.convert(input, {day: 'numeric', month: 'long'})).toEqual('August 2');

    preferLocale('ja');

    expect(pipe.convert(input)).toEqual('8月2日');
    expect(pipe.convert(input, 'short')).toEqual('8/2');
    expect(pipe.convert(input, 'medium')).toEqual('8月2日');
    expect(pipe.convert(input, 'long')).toEqual('8月2日');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('08/02');
    expect(pipe.convert(input, {day: 'numeric', month: 'long'})).toEqual('8月2日');

    preferLocale('ja-JP-u-ca-japanese');

    expect(pipe.convert(input)).toEqual('8月2日');
    expect(pipe.convert(input, 'short')).toEqual('8/2');
    expect(pipe.convert(input, 'medium')).toEqual('8月2日');
    expect(pipe.convert(input, 'long')).toEqual('8月2日');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('08/02');
    expect(pipe.convert(input, {day: 'numeric', month: 'long'})).toEqual('8月2日');

    preferLocale('cs-CZ');

    expect(pipe.convert(input)).toEqual('2. 8.');
    expect(pipe.convert(input, 'short')).toEqual('2. 8.');
    expect(pipe.convert(input, 'medium')).toEqual('2. 8.');
    expect(pipe.convert(input, 'long')).toEqual('2. srpna');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('02. 08.');
    expect(pipe.convert(input, {day: 'numeric', month: 'long'})).toEqual('2. srpna');

    preferLocale('cs-x-japan');

    expect(pipe.convert(input)).toEqual('2. 8.');
    expect(pipe.convert(input, 'short')).toEqual('2. 8.');
    expect(pipe.convert(input, 'medium')).toEqual('2. 8.');
    expect(pipe.convert(input, 'long')).toEqual('2. srpna');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('02. 08.');
    expect(pipe.convert(input, {day: 'numeric', month: 'long'})).toEqual('2. srpna');
  }));

  it('should correctly format PlainDateTime', fakeAsync(() => {
    let input = Temporal.PlainDateTime.from('2012-08-02T05:04:32');

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('2 Aug');
    expect(pipe.convert(input, 'short')).toEqual('02/08');
    expect(pipe.convert(input, 'medium')).toEqual('2 Aug');
    expect(pipe.convert(input, 'long')).toEqual('2 August');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('02/08');
    expect(pipe.convert(input, {day: 'numeric', month: 'long'})).toEqual('2 August');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('Aug 2');
    expect(pipe.convert(input, 'short')).toEqual('8/2');
    expect(pipe.convert(input, 'medium')).toEqual('Aug 2');
    expect(pipe.convert(input, 'long')).toEqual('August 2');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('08/02');
    expect(pipe.convert(input, {day: 'numeric', month: 'long'})).toEqual('August 2');

    preferLocale('ja');

    expect(pipe.convert(input)).toEqual('8月2日');
    expect(pipe.convert(input, 'short')).toEqual('8/2');
    expect(pipe.convert(input, 'medium')).toEqual('8月2日');
    expect(pipe.convert(input, 'long')).toEqual('8月2日');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('08/02');
    expect(pipe.convert(input, {day: 'numeric', month: 'long'})).toEqual('8月2日');

    preferLocale('ja-JP-u-ca-japanese');

    expect(pipe.convert(input)).toEqual('8月2日');
    expect(pipe.convert(input, 'short')).toEqual('8/2');
    expect(pipe.convert(input, 'medium')).toEqual('8月2日');
    expect(pipe.convert(input, 'long')).toEqual('8月2日');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('08/02');
    expect(pipe.convert(input, {day: 'numeric', month: 'long'})).toEqual('8月2日');

    preferLocale('cs-CZ');

    expect(pipe.convert(input)).toEqual('2. 8.');
    expect(pipe.convert(input, 'short')).toEqual('2. 8.');
    expect(pipe.convert(input, 'medium')).toEqual('2. 8.');
    expect(pipe.convert(input, 'long')).toEqual('2. srpna');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('02. 08.');
    expect(pipe.convert(input, {day: 'numeric', month: 'long'})).toEqual('2. srpna');

    preferLocale('cs-x-japan');

    expect(pipe.convert(input)).toEqual('2. 8.');
    expect(pipe.convert(input, 'short')).toEqual('2. 8.');
    expect(pipe.convert(input, 'medium')).toEqual('2. 8.');
    expect(pipe.convert(input, 'long')).toEqual('2. srpna');
    expect(pipe.convert(input, {day: '2-digit', month: '2-digit'})).toEqual('02. 08.');
    expect(pipe.convert(input, {day: 'numeric', month: 'long'})).toEqual('2. srpna');
  }));
});
