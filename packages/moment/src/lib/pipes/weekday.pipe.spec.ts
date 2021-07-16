import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import moment from 'moment';

import { IzCoreService, IzCoreModule, IzLocaleCode } from '@ization/core';

import { IzMWeekdayPipe } from './weekday.pipe';
import { changeDetectorRefMock } from './test-helpers/change-detector-ref.mock';
import { izMomentDefaultFormats } from '../formats/formats.default';
import { localeDefinitions } from './test-helpers/locale-definitions';
import { IzMomentPluginLinkService } from '../plugin-link.service';
import { IzMomentModule } from '../moment.module';

describe('IzMWeekdayPipe', () => {
  let coreService: IzCoreService;
  let linkService: IzMomentPluginLinkService;
  let pipe: IzMWeekdayPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IzCoreModule.withLocales(localeDefinitions),
        IzMomentModule,
      ],
    });
    coreService = TestBed.inject(IzCoreService);
    linkService = TestBed.inject(IzMomentPluginLinkService);
    pipe = new IzMWeekdayPipe(linkService, izMomentDefaultFormats, coreService, changeDetectorRefMock);
  });

  function preferLocale(localeCode: IzLocaleCode): void {
    coreService.preferLocaleCode(localeCode);
    flushMicrotasks();
  }

  it('should create an instance', () => {
    expect(pipe).toBeInstanceOf(IzMWeekdayPipe);
  });

  it('should correctly format string', fakeAsync(() => {
    let input = '2012-08-02';

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('Thu');
    expect(pipe.convert(input, 'short')).toEqual('Th');
    expect(pipe.convert(input, 'medium')).toEqual('Thu');
    expect(pipe.convert(input, 'long')).toEqual('Thursday');
    expect(pipe.convert(input, 'GGGG/[W]W')).toEqual('2012/W31');
    expect(pipe.convert(input, 'W/E')).toEqual('31/4');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('Thu');
    expect(pipe.convert(input, 'short')).toEqual('Th');
    expect(pipe.convert(input, 'medium')).toEqual('Thu');
    expect(pipe.convert(input, 'long')).toEqual('Thursday');
    expect(pipe.convert(input, 'GGGG/[W]W')).toEqual('2012/W31');
    expect(pipe.convert(input, 'W/E')).toEqual('31/4');

    preferLocale('ja');

    expect(pipe.convert(input)).toEqual('木');
    expect(pipe.convert(input, 'short')).toEqual('木');
    expect(pipe.convert(input, 'medium')).toEqual('木');
    expect(pipe.convert(input, 'long')).toEqual('木曜日');
    expect(pipe.convert(input, 'GGGG/[W]W')).toEqual('2012/W31');
    expect(pipe.convert(input, 'W/E')).toEqual('31/4');

    preferLocale('cs');

    expect(pipe.convert(input)).toEqual('čt');
    expect(pipe.convert(input, 'short')).toEqual('čt');
    expect(pipe.convert(input, 'medium')).toEqual('čt');
    expect(pipe.convert(input, 'long')).toEqual('čtvrtek');
    expect(pipe.convert(input, 'GGGG/[W]W')).toEqual('2012/W31');
    expect(pipe.convert(input, 'W/E')).toEqual('31/4');
  }));

  it('should correctly format Moment instance', fakeAsync(() => {
    let input = moment('2012-08-02');

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('Thu');
    expect(pipe.convert(input, 'short')).toEqual('Th');
    expect(pipe.convert(input, 'medium')).toEqual('Thu');
    expect(pipe.convert(input, 'long')).toEqual('Thursday');
    expect(pipe.convert(input, 'GGGG/[W]W')).toEqual('2012/W31');
    expect(pipe.convert(input, 'W/E')).toEqual('31/4');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('Thu');
    expect(pipe.convert(input, 'short')).toEqual('Th');
    expect(pipe.convert(input, 'medium')).toEqual('Thu');
    expect(pipe.convert(input, 'long')).toEqual('Thursday');
    expect(pipe.convert(input, 'GGGG/[W]W')).toEqual('2012/W31');
    expect(pipe.convert(input, 'W/E')).toEqual('31/4');

    preferLocale('ja');

    expect(pipe.convert(input)).toEqual('木');
    expect(pipe.convert(input, 'short')).toEqual('木');
    expect(pipe.convert(input, 'medium')).toEqual('木');
    expect(pipe.convert(input, 'long')).toEqual('木曜日');
    expect(pipe.convert(input, 'GGGG/[W]W')).toEqual('2012/W31');
    expect(pipe.convert(input, 'W/E')).toEqual('31/4');

    preferLocale('cs');

    expect(pipe.convert(input)).toEqual('čt');
    expect(pipe.convert(input, 'short')).toEqual('čt');
    expect(pipe.convert(input, 'medium')).toEqual('čt');
    expect(pipe.convert(input, 'long')).toEqual('čtvrtek');
    expect(pipe.convert(input, 'GGGG/[W]W')).toEqual('2012/W31');
    expect(pipe.convert(input, 'W/E')).toEqual('31/4');
  }));

  it('should correctly format Weekday instance', fakeAsync(() => {
    let input = new Date('2012-08-02T05:04:32');

    preferLocale('en-GB');

    expect(pipe.convert(input)).toEqual('Thu');
    expect(pipe.convert(input, 'short')).toEqual('Th');
    expect(pipe.convert(input, 'medium')).toEqual('Thu');
    expect(pipe.convert(input, 'long')).toEqual('Thursday');
    expect(pipe.convert(input, 'GGGG/[W]W')).toEqual('2012/W31');
    expect(pipe.convert(input, 'W/E')).toEqual('31/4');

    preferLocale('en-US');

    expect(pipe.convert(input)).toEqual('Thu');
    expect(pipe.convert(input, 'short')).toEqual('Th');
    expect(pipe.convert(input, 'medium')).toEqual('Thu');
    expect(pipe.convert(input, 'long')).toEqual('Thursday');
    expect(pipe.convert(input, 'GGGG/[W]W')).toEqual('2012/W31');
    expect(pipe.convert(input, 'W/E')).toEqual('31/4');

    preferLocale('ja');

    expect(pipe.convert(input)).toEqual('木');
    expect(pipe.convert(input, 'short')).toEqual('木');
    expect(pipe.convert(input, 'medium')).toEqual('木');
    expect(pipe.convert(input, 'long')).toEqual('木曜日');
    expect(pipe.convert(input, 'GGGG/[W]W')).toEqual('2012/W31');
    expect(pipe.convert(input, 'W/E')).toEqual('31/4');

    preferLocale('cs');

    expect(pipe.convert(input)).toEqual('čt');
    expect(pipe.convert(input, 'short')).toEqual('čt');
    expect(pipe.convert(input, 'medium')).toEqual('čt');
    expect(pipe.convert(input, 'long')).toEqual('čtvrtek');
    expect(pipe.convert(input, 'GGGG/[W]W')).toEqual('2012/W31');
    expect(pipe.convert(input, 'W/E')).toEqual('31/4');
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
