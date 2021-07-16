import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import moment from 'moment';

import { IzCoreService, IzCoreModule, IzLocaleCode } from '@ization/core';

import { IzMTimePipe } from './time.pipe';
import { changeDetectorRefMock } from './test-helpers/change-detector-ref.mock';
import { izMomentDefaultFormats } from '../formats/formats.default';
import { localeDefinitions } from './test-helpers/locale-definitions';
import { IzMomentPluginLinkService } from '../plugin-link.service';
import { IzMomentModule } from '../moment.module';

describe('IzMTimePipe', () => {
  let coreService: IzCoreService;
  let linkService: IzMomentPluginLinkService;
  let pipe: IzMTimePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IzCoreModule.withLocales(localeDefinitions),
        IzMomentModule,
      ],
    });
    coreService = TestBed.inject(IzCoreService);
    linkService = TestBed.inject(IzMomentPluginLinkService);
    pipe = new IzMTimePipe(linkService, izMomentDefaultFormats, coreService, changeDetectorRefMock);
  });

  function preferLocale(localeCode: IzLocaleCode): void {
    coreService.preferLocaleCode(localeCode);
    flushMicrotasks();
  }

  it('should create an instance', () => {
    expect(pipe).toBeInstanceOf(IzMTimePipe);
  });

  it('should correctly format string', fakeAsync(() => {
    let input = '17:04:32';

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('17:04:32');
    expect(pipe.convert(input, 'short')).toEqual('17:04');
    expect(pipe.convert(input, 'medium')).toEqual('17:04:32');
    expect(pipe.convert(input, 'long')).toEqual('17:04:32');
    expect(pipe.convert(input, 'H:mm')).toEqual('17:04');
    expect(pipe.convert(input, 'h:mm A')).toEqual('5:04 PM');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('5:04:32 PM');
    expect(pipe.convert(input, 'short')).toEqual('5:04 PM');
    expect(pipe.convert(input, 'medium')).toEqual('5:04:32 PM');
    expect(pipe.convert(input, 'long')).toEqual('5:04:32 PM');
    expect(pipe.convert(input, 'H:mm')).toEqual('17:04');
    expect(pipe.convert(input, 'h:mm A')).toEqual('5:04 PM');

    preferLocale('ja');

    expect(pipe.convert(input)).toEqual('17:04:32');
    expect(pipe.convert(input, 'short')).toEqual('17:04');
    expect(pipe.convert(input, 'medium')).toEqual('17:04:32');
    expect(pipe.convert(input, 'long')).toEqual('17:04:32');
    expect(pipe.convert(input, 'H:mm')).toEqual('17:04');
    expect(pipe.convert(input, 'h:mm A')).toEqual('5:04 午後');

    preferLocale('cs');

    expect(pipe.convert(input)).toEqual('17:04:32');
    expect(pipe.convert(input, 'short')).toEqual('17:04');
    expect(pipe.convert(input, 'medium')).toEqual('17:04:32');
    expect(pipe.convert(input, 'long')).toEqual('17:04:32');
    expect(pipe.convert(input, 'H:mm')).toEqual('17:04');
    expect(pipe.convert(input, 'h:mm A')).toEqual('5:04 PM');
  }));

  it('should correctly format Moment instance', fakeAsync(() => {
    let input = moment('17:04:32', 'HH:mm:ss');

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('17:04:32');
    expect(pipe.convert(input, 'short')).toEqual('17:04');
    expect(pipe.convert(input, 'medium')).toEqual('17:04:32');
    expect(pipe.convert(input, 'long')).toEqual('17:04:32');
    expect(pipe.convert(input, 'H:mm')).toEqual('17:04');
    expect(pipe.convert(input, 'h:mm A')).toEqual('5:04 PM');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('5:04:32 PM');
    expect(pipe.convert(input, 'short')).toEqual('5:04 PM');
    expect(pipe.convert(input, 'medium')).toEqual('5:04:32 PM');
    expect(pipe.convert(input, 'long')).toEqual('5:04:32 PM');
    expect(pipe.convert(input, 'H:mm')).toEqual('17:04');
    expect(pipe.convert(input, 'h:mm A')).toEqual('5:04 PM');

    preferLocale('ja');

    expect(pipe.convert(input)).toEqual('17:04:32');
    expect(pipe.convert(input, 'short')).toEqual('17:04');
    expect(pipe.convert(input, 'medium')).toEqual('17:04:32');
    expect(pipe.convert(input, 'long')).toEqual('17:04:32');
    expect(pipe.convert(input, 'H:mm')).toEqual('17:04');
    expect(pipe.convert(input, 'h:mm A')).toEqual('5:04 午後');

    preferLocale('cs');

    expect(pipe.convert(input)).toEqual('17:04:32');
    expect(pipe.convert(input, 'short')).toEqual('17:04');
    expect(pipe.convert(input, 'medium')).toEqual('17:04:32');
    expect(pipe.convert(input, 'long')).toEqual('17:04:32');
    expect(pipe.convert(input, 'H:mm')).toEqual('17:04');
    expect(pipe.convert(input, 'h:mm A')).toEqual('5:04 PM');
  }));

  it('should correctly format Date instance', fakeAsync(() => {
    let input = new Date('2012-08-02T17:04:32');

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('17:04:32');
    expect(pipe.convert(input, 'short')).toEqual('17:04');
    expect(pipe.convert(input, 'medium')).toEqual('17:04:32');
    expect(pipe.convert(input, 'long')).toEqual('17:04:32');
    expect(pipe.convert(input, 'H:mm')).toEqual('17:04');
    expect(pipe.convert(input, 'h:mm A')).toEqual('5:04 PM');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('5:04:32 PM');
    expect(pipe.convert(input, 'short')).toEqual('5:04 PM');
    expect(pipe.convert(input, 'medium')).toEqual('5:04:32 PM');
    expect(pipe.convert(input, 'long')).toEqual('5:04:32 PM');
    expect(pipe.convert(input, 'H:mm')).toEqual('17:04');
    expect(pipe.convert(input, 'h:mm A')).toEqual('5:04 PM');

    preferLocale('ja');

    expect(pipe.convert(input)).toEqual('17:04:32');
    expect(pipe.convert(input, 'short')).toEqual('17:04');
    expect(pipe.convert(input, 'medium')).toEqual('17:04:32');
    expect(pipe.convert(input, 'long')).toEqual('17:04:32');
    expect(pipe.convert(input, 'H:mm')).toEqual('17:04');
    expect(pipe.convert(input, 'h:mm A')).toEqual('5:04 午後');

    preferLocale('cs');

    expect(pipe.convert(input)).toEqual('17:04:32');
    expect(pipe.convert(input, 'short')).toEqual('17:04');
    expect(pipe.convert(input, 'medium')).toEqual('17:04:32');
    expect(pipe.convert(input, 'long')).toEqual('17:04:32');
    expect(pipe.convert(input, 'H:mm')).toEqual('17:04');
    expect(pipe.convert(input, 'h:mm A')).toEqual('5:04 PM');
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
