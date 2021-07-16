import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import moment from 'moment';

import { IzCoreService, IzCoreModule, IzLocaleCode } from '@ization/core';

import { IzMYearMonthPipe } from './year-month.pipe';
import { changeDetectorRefMock } from './test-helpers/change-detector-ref.mock';
import { izMomentDefaultFormats } from '../formats/formats.default';
import { localeDefinitions } from './test-helpers/locale-definitions';
import { IzMomentPluginLinkService } from '../plugin-link.service';
import { IzMomentModule } from '../moment.module';

describe('IzMYearMonthPipe', () => {
  let coreService: IzCoreService;
  let linkService: IzMomentPluginLinkService;
  let pipe: IzMYearMonthPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IzCoreModule.withLocales(localeDefinitions),
        IzMomentModule,
      ],
    });
    coreService = TestBed.inject(IzCoreService);
    linkService = TestBed.inject(IzMomentPluginLinkService);
    pipe = new IzMYearMonthPipe(linkService, izMomentDefaultFormats, coreService, changeDetectorRefMock);
  });

  function preferLocale(localeCode: IzLocaleCode): void {
    coreService.preferLocaleCode(localeCode);
    flushMicrotasks();
  }

  it('should create an instance', () => {
    expect(pipe).toBeInstanceOf(IzMYearMonthPipe);
  });

  it('should correctly format string', fakeAsync(() => {
    let input = '2012-08';

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('Aug 2012');
    expect(pipe.convert(input, 'short')).toEqual('8/2012');
    expect(pipe.convert(input, 'medium')).toEqual('Aug 2012');
    expect(pipe.convert(input, 'long')).toEqual('August 2012');
    expect(pipe.convert(input, 'YYYY/[Q]Q')).toEqual('2012/Q3');
    expect(pipe.convert(input, 'M/YY')).toEqual('8/12');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('Aug 2012');
    expect(pipe.convert(input, 'short')).toEqual('8/2012');
    expect(pipe.convert(input, 'medium')).toEqual('Aug 2012');
    expect(pipe.convert(input, 'long')).toEqual('August 2012');
    expect(pipe.convert(input, 'YYYY/[Q]Q')).toEqual('2012/Q3');
    expect(pipe.convert(input, 'M/YY')).toEqual('8/12');

    preferLocale('ja');

    expect(pipe.convert(input)).toEqual('8月 2012');
    expect(pipe.convert(input, 'short')).toEqual('8/2012');
    expect(pipe.convert(input, 'medium')).toEqual('8月 2012');
    expect(pipe.convert(input, 'long')).toEqual('8月 2012');
    expect(pipe.convert(input, 'YYYY/[Q]Q')).toEqual('2012/Q3');
    expect(pipe.convert(input, 'M/YY')).toEqual('8/12');

    preferLocale('cs');

    expect(pipe.convert(input)).toEqual('srp 2012');
    expect(pipe.convert(input, 'short')).toEqual('8/2012');
    expect(pipe.convert(input, 'medium')).toEqual('srp 2012');
    expect(pipe.convert(input, 'long')).toEqual('srpen 2012');
    expect(pipe.convert(input, 'YYYY/[Q]Q')).toEqual('2012/Q3');
    expect(pipe.convert(input, 'M/YY')).toEqual('8/12');
  }));

  it('should correctly format Moment instance', fakeAsync(() => {
    let input = moment('2012-08');

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('Aug 2012');
    expect(pipe.convert(input, 'short')).toEqual('8/2012');
    expect(pipe.convert(input, 'medium')).toEqual('Aug 2012');
    expect(pipe.convert(input, 'long')).toEqual('August 2012');
    expect(pipe.convert(input, 'YYYY/[Q]Q')).toEqual('2012/Q3');
    expect(pipe.convert(input, 'M/YY')).toEqual('8/12');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('Aug 2012');
    expect(pipe.convert(input, 'short')).toEqual('8/2012');
    expect(pipe.convert(input, 'medium')).toEqual('Aug 2012');
    expect(pipe.convert(input, 'long')).toEqual('August 2012');
    expect(pipe.convert(input, 'YYYY/[Q]Q')).toEqual('2012/Q3');
    expect(pipe.convert(input, 'M/YY')).toEqual('8/12');

    preferLocale('ja');

    expect(pipe.convert(input)).toEqual('8月 2012');
    expect(pipe.convert(input, 'short')).toEqual('8/2012');
    expect(pipe.convert(input, 'medium')).toEqual('8月 2012');
    expect(pipe.convert(input, 'long')).toEqual('8月 2012');
    expect(pipe.convert(input, 'YYYY/[Q]Q')).toEqual('2012/Q3');
    expect(pipe.convert(input, 'M/YY')).toEqual('8/12');

    preferLocale('cs');

    expect(pipe.convert(input)).toEqual('srp 2012');
    expect(pipe.convert(input, 'short')).toEqual('8/2012');
    expect(pipe.convert(input, 'medium')).toEqual('srp 2012');
    expect(pipe.convert(input, 'long')).toEqual('srpen 2012');
    expect(pipe.convert(input, 'YYYY/[Q]Q')).toEqual('2012/Q3');
    expect(pipe.convert(input, 'M/YY')).toEqual('8/12');
  }));

  it('should correctly format YearMonth instance', fakeAsync(() => {
    let input = new Date('2012-08-02T05:04:32');

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('Aug 2012');
    expect(pipe.convert(input, 'short')).toEqual('8/2012');
    expect(pipe.convert(input, 'medium')).toEqual('Aug 2012');
    expect(pipe.convert(input, 'long')).toEqual('August 2012');
    expect(pipe.convert(input, 'YYYY/[Q]Q')).toEqual('2012/Q3');
    expect(pipe.convert(input, 'M/YY')).toEqual('8/12');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('Aug 2012');
    expect(pipe.convert(input, 'short')).toEqual('8/2012');
    expect(pipe.convert(input, 'medium')).toEqual('Aug 2012');
    expect(pipe.convert(input, 'long')).toEqual('August 2012');
    expect(pipe.convert(input, 'YYYY/[Q]Q')).toEqual('2012/Q3');
    expect(pipe.convert(input, 'M/YY')).toEqual('8/12');

    preferLocale('ja');

    expect(pipe.convert(input)).toEqual('8月 2012');
    expect(pipe.convert(input, 'short')).toEqual('8/2012');
    expect(pipe.convert(input, 'medium')).toEqual('8月 2012');
    expect(pipe.convert(input, 'long')).toEqual('8月 2012');
    expect(pipe.convert(input, 'YYYY/[Q]Q')).toEqual('2012/Q3');
    expect(pipe.convert(input, 'M/YY')).toEqual('8/12');

    preferLocale('cs');

    expect(pipe.convert(input)).toEqual('srp 2012');
    expect(pipe.convert(input, 'short')).toEqual('8/2012');
    expect(pipe.convert(input, 'medium')).toEqual('srp 2012');
    expect(pipe.convert(input, 'long')).toEqual('srpen 2012');
    expect(pipe.convert(input, 'YYYY/[Q]Q')).toEqual('2012/Q3');
    expect(pipe.convert(input, 'M/YY')).toEqual('8/12');
  }));

  it('should correctly format invalid input', fakeAsync(() => {
    let input = moment.invalid();

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('Invalid date');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('Invalid date');

    preferLocale('ja');

    expect(pipe.convert(input)).toEqual('Invalid date');

    preferLocale('cs');

    expect(pipe.convert(input)).toEqual('Invalid date');
  }));
});
