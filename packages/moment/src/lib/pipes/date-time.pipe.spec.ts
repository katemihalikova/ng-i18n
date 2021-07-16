import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import moment from 'moment';

import { IzCoreService, IzCoreModule, IzLocaleCode } from '@ization/core';

import { IzMDateTimePipe } from './date-time.pipe';
import { changeDetectorRefMock } from './test-helpers/change-detector-ref.mock';
import { izMomentDefaultFormats } from '../formats/formats.default';
import { localeDefinitions } from './test-helpers/locale-definitions';
import { IzMomentPluginLinkService } from '../plugin-link.service';
import { IzMomentModule } from '../moment.module';

describe('IzMDateTimePipe', () => {
  let coreService: IzCoreService;
  let linkService: IzMomentPluginLinkService;
  let pipe: IzMDateTimePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IzCoreModule.withLocales(localeDefinitions),
        IzMomentModule,
      ],
    });
    coreService = TestBed.inject(IzCoreService);
    linkService = TestBed.inject(IzMomentPluginLinkService);
    pipe = new IzMDateTimePipe(linkService, izMomentDefaultFormats, coreService, changeDetectorRefMock);
  });

  function preferLocale(localeCode: IzLocaleCode): void {
    coreService.preferLocaleCode(localeCode);
    flushMicrotasks();
  }

  it('should create an instance', () => {
    expect(pipe).toBeInstanceOf(IzMDateTimePipe);
  });

  it('should correctly format string', fakeAsync(() => {
    let input = '2012-08-02T17:04:32';

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('2 Aug 2012 17:04');
    expect(pipe.convert(input, 'short')).toEqual('2/8/2012 17:04');
    expect(pipe.convert(input, 'medium')).toEqual('2 Aug 2012 17:04');
    expect(pipe.convert(input, 'long')).toEqual('Thursday, 2 August 2012 17:04');
    expect(pipe.convert(input, 'llll')).toEqual('Thu, 2 Aug 2012 17:04');
    expect(pipe.convert(input, 'YYYY/DDD H:mm')).toEqual('2012/215 17:04');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('Aug 2, 2012 5:04 PM');
    expect(pipe.convert(input, 'short')).toEqual('8/2/2012 5:04 PM');
    expect(pipe.convert(input, 'medium')).toEqual('Aug 2, 2012 5:04 PM');
    expect(pipe.convert(input, 'long')).toEqual('Thursday, August 2, 2012 5:04 PM');
    expect(pipe.convert(input, 'llll')).toEqual('Thu, Aug 2, 2012 5:04 PM');
    expect(pipe.convert(input, 'YYYY/DDD H:mm')).toEqual('2012/215 17:04');

    preferLocale('ja');

    expect(pipe.convert(input)).toEqual('2012年8月2日 17:04');
    expect(pipe.convert(input, 'short')).toEqual('2012/08/02 17:04');
    expect(pipe.convert(input, 'medium')).toEqual('2012年8月2日 17:04');
    expect(pipe.convert(input, 'long')).toEqual('2012年8月2日 木曜日 17:04');
    expect(pipe.convert(input, 'llll')).toEqual('2012年8月2日(木) 17:04');
    expect(pipe.convert(input, 'YYYY/DDD H:mm')).toEqual('2012/215 17:04');

    preferLocale('cs');

    expect(pipe.convert(input)).toEqual('2. srp 2012 17:04');
    expect(pipe.convert(input, 'short')).toEqual('2. 8. 2012 17:04');
    expect(pipe.convert(input, 'medium')).toEqual('2. srp 2012 17:04');
    expect(pipe.convert(input, 'long')).toEqual('čtvrtek 2. srpen 2012 17:04');
    expect(pipe.convert(input, 'llll')).toEqual('čt 2. srp 2012 17:04');
    expect(pipe.convert(input, 'YYYY/DDD H:mm')).toEqual('2012/215 17:04');
  }));

  it('should correctly format Moment instance', fakeAsync(() => {
    let input = moment('2012-08-02T17:04:32');

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('2 Aug 2012 17:04');
    expect(pipe.convert(input, 'short')).toEqual('2/8/2012 17:04');
    expect(pipe.convert(input, 'medium')).toEqual('2 Aug 2012 17:04');
    expect(pipe.convert(input, 'long')).toEqual('Thursday, 2 August 2012 17:04');
    expect(pipe.convert(input, 'llll')).toEqual('Thu, 2 Aug 2012 17:04');
    expect(pipe.convert(input, 'YYYY/DDD H:mm')).toEqual('2012/215 17:04');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('Aug 2, 2012 5:04 PM');
    expect(pipe.convert(input, 'short')).toEqual('8/2/2012 5:04 PM');
    expect(pipe.convert(input, 'medium')).toEqual('Aug 2, 2012 5:04 PM');
    expect(pipe.convert(input, 'long')).toEqual('Thursday, August 2, 2012 5:04 PM');
    expect(pipe.convert(input, 'llll')).toEqual('Thu, Aug 2, 2012 5:04 PM');
    expect(pipe.convert(input, 'YYYY/DDD H:mm')).toEqual('2012/215 17:04');

    preferLocale('ja');

    expect(pipe.convert(input)).toEqual('2012年8月2日 17:04');
    expect(pipe.convert(input, 'short')).toEqual('2012/08/02 17:04');
    expect(pipe.convert(input, 'medium')).toEqual('2012年8月2日 17:04');
    expect(pipe.convert(input, 'long')).toEqual('2012年8月2日 木曜日 17:04');
    expect(pipe.convert(input, 'llll')).toEqual('2012年8月2日(木) 17:04');
    expect(pipe.convert(input, 'YYYY/DDD H:mm')).toEqual('2012/215 17:04');

    preferLocale('cs');

    expect(pipe.convert(input)).toEqual('2. srp 2012 17:04');
    expect(pipe.convert(input, 'short')).toEqual('2. 8. 2012 17:04');
    expect(pipe.convert(input, 'medium')).toEqual('2. srp 2012 17:04');
    expect(pipe.convert(input, 'long')).toEqual('čtvrtek 2. srpen 2012 17:04');
    expect(pipe.convert(input, 'llll')).toEqual('čt 2. srp 2012 17:04');
    expect(pipe.convert(input, 'YYYY/DDD H:mm')).toEqual('2012/215 17:04');
  }));

  it('should correctly format Date instance', fakeAsync(() => {
    let input = new Date('2012-08-02T17:04:32');

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('2 Aug 2012 17:04');
    expect(pipe.convert(input, 'short')).toEqual('2/8/2012 17:04');
    expect(pipe.convert(input, 'medium')).toEqual('2 Aug 2012 17:04');
    expect(pipe.convert(input, 'long')).toEqual('Thursday, 2 August 2012 17:04');
    expect(pipe.convert(input, 'llll')).toEqual('Thu, 2 Aug 2012 17:04');
    expect(pipe.convert(input, 'YYYY/DDD H:mm')).toEqual('2012/215 17:04');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('Aug 2, 2012 5:04 PM');
    expect(pipe.convert(input, 'short')).toEqual('8/2/2012 5:04 PM');
    expect(pipe.convert(input, 'medium')).toEqual('Aug 2, 2012 5:04 PM');
    expect(pipe.convert(input, 'long')).toEqual('Thursday, August 2, 2012 5:04 PM');
    expect(pipe.convert(input, 'llll')).toEqual('Thu, Aug 2, 2012 5:04 PM');
    expect(pipe.convert(input, 'YYYY/DDD H:mm')).toEqual('2012/215 17:04');

    preferLocale('ja');

    expect(pipe.convert(input)).toEqual('2012年8月2日 17:04');
    expect(pipe.convert(input, 'short')).toEqual('2012/08/02 17:04');
    expect(pipe.convert(input, 'medium')).toEqual('2012年8月2日 17:04');
    expect(pipe.convert(input, 'long')).toEqual('2012年8月2日 木曜日 17:04');
    expect(pipe.convert(input, 'llll')).toEqual('2012年8月2日(木) 17:04');
    expect(pipe.convert(input, 'YYYY/DDD H:mm')).toEqual('2012/215 17:04');

    preferLocale('cs');

    expect(pipe.convert(input)).toEqual('2. srp 2012 17:04');
    expect(pipe.convert(input, 'short')).toEqual('2. 8. 2012 17:04');
    expect(pipe.convert(input, 'medium')).toEqual('2. srp 2012 17:04');
    expect(pipe.convert(input, 'long')).toEqual('čtvrtek 2. srpen 2012 17:04');
    expect(pipe.convert(input, 'llll')).toEqual('čt 2. srp 2012 17:04');
    expect(pipe.convert(input, 'YYYY/DDD H:mm')).toEqual('2012/215 17:04');
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
