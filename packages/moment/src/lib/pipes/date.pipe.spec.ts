import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import moment from 'moment';

import { IzCoreService, IzCoreModule, IzLocaleCode } from '@ization/core';

import { IzMDatePipe } from './date.pipe';
import { changeDetectorRefMock } from './test-helpers/change-detector-ref.mock';
import { izMomentDefaultFormats } from '../formats/formats.default';
import { localeDefinitions } from './test-helpers/locale-definitions';
import { IzMomentPluginLinkService } from '../plugin-link.service';
import { IzMomentModule } from '../moment.module';

describe('IzMDatePipe', () => {
  let coreService: IzCoreService;
  let linkService: IzMomentPluginLinkService;
  let pipe: IzMDatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IzCoreModule.withLocales(localeDefinitions),
        IzMomentModule,
      ],
    });
    coreService = TestBed.inject(IzCoreService);
    linkService = TestBed.inject(IzMomentPluginLinkService);
    pipe = new IzMDatePipe(linkService, izMomentDefaultFormats, coreService, changeDetectorRefMock);
  });

  function preferLocale(localeCode: IzLocaleCode): void {
    coreService.preferLocaleCode(localeCode);
    flushMicrotasks();
  }

  it('should create an instance', () => {
    expect(pipe).toBeInstanceOf(IzMDatePipe);
  });

  it('should correctly format string', fakeAsync(() => {
    let input = '2012-08-02';

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('02/08/2012');
    expect(pipe.convert(input, 'short')).toEqual('2/8/2012');
    expect(pipe.convert(input, 'medium')).toEqual('02/08/2012');
    expect(pipe.convert(input, 'long')).toEqual('2 August 2012');
    expect(pipe.convert(input, 'YYYY/[Q]Q')).toEqual('2012/Q3');
    expect(pipe.convert(input, 'dd l')).toEqual('Th 2/8/2012');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('08/02/2012');
    expect(pipe.convert(input, 'short')).toEqual('8/2/2012');
    expect(pipe.convert(input, 'medium')).toEqual('08/02/2012');
    expect(pipe.convert(input, 'long')).toEqual('August 2, 2012');
    expect(pipe.convert(input, 'YYYY/[Q]Q')).toEqual('2012/Q3');
    expect(pipe.convert(input, 'dd l')).toEqual('Th 8/2/2012');

    preferLocale('ja');

    expect(pipe.convert(input)).toEqual('2012/08/02');
    expect(pipe.convert(input, 'short')).toEqual('2012/08/02');
    expect(pipe.convert(input, 'medium')).toEqual('2012/08/02');
    expect(pipe.convert(input, 'long')).toEqual('2012年8月2日');
    expect(pipe.convert(input, 'YYYY/[Q]Q')).toEqual('2012/Q3');
    expect(pipe.convert(input, 'dd l')).toEqual('木 2012/08/02');

    preferLocale('cs');

    expect(pipe.convert(input)).toEqual('02.08.2012');
    expect(pipe.convert(input, 'short')).toEqual('2. 8. 2012');
    expect(pipe.convert(input, 'medium')).toEqual('02.08.2012');
    expect(pipe.convert(input, 'long')).toEqual('2. srpen 2012');
    expect(pipe.convert(input, 'YYYY/[Q]Q')).toEqual('2012/Q3');
    expect(pipe.convert(input, 'dd l')).toEqual('čt 2. 8. 2012');
  }));

  it('should correctly format Moment instance', fakeAsync(() => {
    let input = moment('2012-08-02');

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('02/08/2012');
    expect(pipe.convert(input, 'short')).toEqual('2/8/2012');
    expect(pipe.convert(input, 'medium')).toEqual('02/08/2012');
    expect(pipe.convert(input, 'long')).toEqual('2 August 2012');
    expect(pipe.convert(input, 'YYYY/[Q]Q')).toEqual('2012/Q3');
    expect(pipe.convert(input, 'dd l')).toEqual('Th 2/8/2012');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('08/02/2012');
    expect(pipe.convert(input, 'short')).toEqual('8/2/2012');
    expect(pipe.convert(input, 'medium')).toEqual('08/02/2012');
    expect(pipe.convert(input, 'long')).toEqual('August 2, 2012');
    expect(pipe.convert(input, 'YYYY/[Q]Q')).toEqual('2012/Q3');
    expect(pipe.convert(input, 'dd l')).toEqual('Th 8/2/2012');

    preferLocale('ja');

    expect(pipe.convert(input)).toEqual('2012/08/02');
    expect(pipe.convert(input, 'short')).toEqual('2012/08/02');
    expect(pipe.convert(input, 'medium')).toEqual('2012/08/02');
    expect(pipe.convert(input, 'long')).toEqual('2012年8月2日');
    expect(pipe.convert(input, 'YYYY/[Q]Q')).toEqual('2012/Q3');
    expect(pipe.convert(input, 'dd l')).toEqual('木 2012/08/02');

    preferLocale('cs');

    expect(pipe.convert(input)).toEqual('02.08.2012');
    expect(pipe.convert(input, 'short')).toEqual('2. 8. 2012');
    expect(pipe.convert(input, 'medium')).toEqual('02.08.2012');
    expect(pipe.convert(input, 'long')).toEqual('2. srpen 2012');
    expect(pipe.convert(input, 'YYYY/[Q]Q')).toEqual('2012/Q3');
    expect(pipe.convert(input, 'dd l')).toEqual('čt 2. 8. 2012');
  }));

  it('should correctly format Date instance', fakeAsync(() => {
    let input = new Date('2012-08-02T05:04:32');

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('02/08/2012');
    expect(pipe.convert(input, 'short')).toEqual('2/8/2012');
    expect(pipe.convert(input, 'medium')).toEqual('02/08/2012');
    expect(pipe.convert(input, 'long')).toEqual('2 August 2012');
    expect(pipe.convert(input, 'YYYY/[Q]Q')).toEqual('2012/Q3');
    expect(pipe.convert(input, 'dd l')).toEqual('Th 2/8/2012');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('08/02/2012');
    expect(pipe.convert(input, 'short')).toEqual('8/2/2012');
    expect(pipe.convert(input, 'medium')).toEqual('08/02/2012');
    expect(pipe.convert(input, 'long')).toEqual('August 2, 2012');
    expect(pipe.convert(input, 'YYYY/[Q]Q')).toEqual('2012/Q3');
    expect(pipe.convert(input, 'dd l')).toEqual('Th 8/2/2012');

    preferLocale('ja');

    expect(pipe.convert(input)).toEqual('2012/08/02');
    expect(pipe.convert(input, 'short')).toEqual('2012/08/02');
    expect(pipe.convert(input, 'medium')).toEqual('2012/08/02');
    expect(pipe.convert(input, 'long')).toEqual('2012年8月2日');
    expect(pipe.convert(input, 'YYYY/[Q]Q')).toEqual('2012/Q3');
    expect(pipe.convert(input, 'dd l')).toEqual('木 2012/08/02');

    preferLocale('cs');

    expect(pipe.convert(input)).toEqual('02.08.2012');
    expect(pipe.convert(input, 'short')).toEqual('2. 8. 2012');
    expect(pipe.convert(input, 'medium')).toEqual('02.08.2012');
    expect(pipe.convert(input, 'long')).toEqual('2. srpen 2012');
    expect(pipe.convert(input, 'YYYY/[Q]Q')).toEqual('2012/Q3');
    expect(pipe.convert(input, 'dd l')).toEqual('čt 2. 8. 2012');
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
