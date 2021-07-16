import { fakeAsync, flushMicrotasks, TestBed, waitForAsync } from '@angular/core/testing';
import { IzCoreService, IzCoreModule, IzLocaleCode } from '@ization/core';

import { IzTemporalModule } from '../temporal.module';
import { IzYearMonthPipe } from './year-month.pipe';
import { changeDetectorRefMock } from './test-helpers/change-detector-ref.mock';
import { izTemporalDefaultFormats } from '../formats/formats.default';
import { localeDefinitions } from './test-helpers/locale-definitions';
import { IzTemporalPluginLinkService } from '../plugin-link.service';

describe('IzYearMonthPipe', () => {
  let coreService: IzCoreService;
  let linkService: IzTemporalPluginLinkService;
  let pipe: IzYearMonthPipe;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        IzCoreModule.withLocales(localeDefinitions),
        IzTemporalModule,
      ],
    });
    coreService = TestBed.inject(IzCoreService);
    linkService = TestBed.inject(IzTemporalPluginLinkService);
    pipe = new IzYearMonthPipe(linkService, izTemporalDefaultFormats, coreService, changeDetectorRefMock);
  }));

  function preferLocale(localeCode: IzLocaleCode): void {
    coreService.preferLocaleCode(localeCode);
    flushMicrotasks();
  }

  it('should create an instance', () => {
    expect(pipe).toBeInstanceOf(IzYearMonthPipe);
  });

  it('should correctly format PlainYearMonth', fakeAsync(() => {
    let input = Temporal.PlainYearMonth.from('2012-08');

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('Aug 2012');
    expect(pipe.convert(input, 'short')).toEqual('08/2012');
    expect(pipe.convert(input, 'medium')).toEqual('Aug 2012');
    expect(pipe.convert(input, 'long')).toEqual('August 2012');
    expect(pipe.convert(input, {month: 'short'})).toEqual('Aug');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('08/2012');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('August 2012');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('Aug 2012');
    expect(pipe.convert(input, 'short')).toEqual('8/2012');
    expect(pipe.convert(input, 'medium')).toEqual('Aug 2012');
    expect(pipe.convert(input, 'long')).toEqual('August 2012');
    expect(pipe.convert(input, {month: 'short'})).toEqual('Aug');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('8/2012');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('August 2012');

    preferLocale('ja');

    expect(pipe.convert(input)).toEqual('2012年8月');
    expect(pipe.convert(input, 'short')).toEqual('2012/8');
    expect(pipe.convert(input, 'medium')).toEqual('2012年8月');
    expect(pipe.convert(input, 'long')).toEqual('2012年8月');
    expect(pipe.convert(input, {month: 'short'})).toEqual('8月');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('2012/8');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('2012年8月');

    preferLocale('ja-JP-u-ca-japanese');

    expect(pipe.convert(input)).toEqual('平成24年8月');
    expect(pipe.convert(input, 'short')).toEqual('H24/8');
    expect(pipe.convert(input, 'medium')).toEqual('平成24年8月');
    expect(pipe.convert(input, 'long')).toEqual('平成24年8月');
    expect(pipe.convert(input, {month: 'short'})).toEqual('8月');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('H24/8');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('平成24年8月');

    preferLocale('cs-CZ');

    expect(pipe.convert(input)).toEqual('srpen 2012');
    expect(pipe.convert(input, 'short')).toEqual('8/2012');
    expect(pipe.convert(input, 'medium')).toEqual('srpen 2012');
    expect(pipe.convert(input, 'long')).toEqual('srpen 2012');
    expect(pipe.convert(input, {month: 'short'})).toEqual('srp');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('8/2012');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('srpen 2012');

    preferLocale('cs-x-japan');

    expect(pipe.convert(input)).toEqual('srpen 24 Heisei');
    expect(pipe.convert(input, 'short')).toEqual('8/24 H');
    expect(pipe.convert(input, 'medium')).toEqual('srpen 24 Heisei');
    expect(pipe.convert(input, 'long')).toEqual('srpen 24 Heisei');
    expect(pipe.convert(input, {month: 'short'})).toEqual('srp');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('8/24 H');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('srpen 24 Heisei');
  }));

  it('should correctly format PlainDate', fakeAsync(() => {
    let input = Temporal.PlainDate.from('2012-08-02');

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('Aug 2012');
    expect(pipe.convert(input, 'short')).toEqual('08/2012');
    expect(pipe.convert(input, 'medium')).toEqual('Aug 2012');
    expect(pipe.convert(input, 'long')).toEqual('August 2012');
    expect(pipe.convert(input, {month: 'short'})).toEqual('Aug');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('08/2012');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('August 2012');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('Aug 2012');
    expect(pipe.convert(input, 'short')).toEqual('8/2012');
    expect(pipe.convert(input, 'medium')).toEqual('Aug 2012');
    expect(pipe.convert(input, 'long')).toEqual('August 2012');
    expect(pipe.convert(input, {month: 'short'})).toEqual('Aug');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('8/2012');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('August 2012');

    preferLocale('ja');

    expect(pipe.convert(input)).toEqual('2012年8月');
    expect(pipe.convert(input, 'short')).toEqual('2012/8');
    expect(pipe.convert(input, 'medium')).toEqual('2012年8月');
    expect(pipe.convert(input, 'long')).toEqual('2012年8月');
    expect(pipe.convert(input, {month: 'short'})).toEqual('8月');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('2012/8');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('2012年8月');

    preferLocale('ja-JP-u-ca-japanese');

    expect(pipe.convert(input)).toEqual('平成24年8月');
    expect(pipe.convert(input, 'short')).toEqual('H24/8');
    expect(pipe.convert(input, 'medium')).toEqual('平成24年8月');
    expect(pipe.convert(input, 'long')).toEqual('平成24年8月');
    expect(pipe.convert(input, {month: 'short'})).toEqual('8月');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('H24/8');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('平成24年8月');

    preferLocale('cs-CZ');

    expect(pipe.convert(input)).toEqual('srpen 2012');
    expect(pipe.convert(input, 'short')).toEqual('8/2012');
    expect(pipe.convert(input, 'medium')).toEqual('srpen 2012');
    expect(pipe.convert(input, 'long')).toEqual('srpen 2012');
    expect(pipe.convert(input, {month: 'short'})).toEqual('srp');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('8/2012');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('srpen 2012');

    preferLocale('cs-x-japan');

    expect(pipe.convert(input)).toEqual('srpen 24 Heisei');
    expect(pipe.convert(input, 'short')).toEqual('8/24 H');
    expect(pipe.convert(input, 'medium')).toEqual('srpen 24 Heisei');
    expect(pipe.convert(input, 'long')).toEqual('srpen 24 Heisei');
    expect(pipe.convert(input, {month: 'short'})).toEqual('srp');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('8/24 H');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('srpen 24 Heisei');
  }));

  it('should correctly format PlainDateTime', fakeAsync(() => {
    let input = Temporal.PlainDateTime.from('2012-08-02T05:04:32');

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('Aug 2012');
    expect(pipe.convert(input, 'short')).toEqual('08/2012');
    expect(pipe.convert(input, 'medium')).toEqual('Aug 2012');
    expect(pipe.convert(input, 'long')).toEqual('August 2012');
    expect(pipe.convert(input, {month: 'short'})).toEqual('Aug');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('08/2012');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('August 2012');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('Aug 2012');
    expect(pipe.convert(input, 'short')).toEqual('8/2012');
    expect(pipe.convert(input, 'medium')).toEqual('Aug 2012');
    expect(pipe.convert(input, 'long')).toEqual('August 2012');
    expect(pipe.convert(input, {month: 'short'})).toEqual('Aug');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('8/2012');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('August 2012');

    preferLocale('ja');

    expect(pipe.convert(input)).toEqual('2012年8月');
    expect(pipe.convert(input, 'short')).toEqual('2012/8');
    expect(pipe.convert(input, 'medium')).toEqual('2012年8月');
    expect(pipe.convert(input, 'long')).toEqual('2012年8月');
    expect(pipe.convert(input, {month: 'short'})).toEqual('8月');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('2012/8');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('2012年8月');

    preferLocale('ja-JP-u-ca-japanese');

    expect(pipe.convert(input)).toEqual('平成24年8月');
    expect(pipe.convert(input, 'short')).toEqual('H24/8');
    expect(pipe.convert(input, 'medium')).toEqual('平成24年8月');
    expect(pipe.convert(input, 'long')).toEqual('平成24年8月');
    expect(pipe.convert(input, {month: 'short'})).toEqual('8月');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('H24/8');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('平成24年8月');

    preferLocale('cs-CZ');

    expect(pipe.convert(input)).toEqual('srpen 2012');
    expect(pipe.convert(input, 'short')).toEqual('8/2012');
    expect(pipe.convert(input, 'medium')).toEqual('srpen 2012');
    expect(pipe.convert(input, 'long')).toEqual('srpen 2012');
    expect(pipe.convert(input, {month: 'short'})).toEqual('srp');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('8/2012');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('srpen 2012');

    preferLocale('cs-x-japan');

    expect(pipe.convert(input)).toEqual('srpen 24 Heisei');
    expect(pipe.convert(input, 'short')).toEqual('8/24 H');
    expect(pipe.convert(input, 'medium')).toEqual('srpen 24 Heisei');
    expect(pipe.convert(input, 'long')).toEqual('srpen 24 Heisei');
    expect(pipe.convert(input, {month: 'short'})).toEqual('srp');
    expect(pipe.convert(input, {month: 'numeric', year: 'numeric'})).toEqual('8/24 H');
    expect(pipe.convert(input, {month: 'long', year: 'numeric'})).toEqual('srpen 24 Heisei');
  }));
});
