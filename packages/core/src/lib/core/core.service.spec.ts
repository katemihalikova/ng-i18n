// tslint:disable: no-null-keyword

import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { Observer } from 'rxjs';

import { IzLocaleDefinitions } from '../tokens/locale-definitions.token';
import { IzPluginLinks } from '../tokens/plugin-links.token';
import { IzPluginLink } from '../types/plugin-link';
import { IzLocaleCode } from '../types/locale-code';
import { IzLocaleDefinition } from '../types/locale-definition';

import { IzCoreService, LOCALSTORAGE_LOCALE_CODE } from './core.service';

const testDefinitions: IzLocaleDefinition[] = [
  {localeCode: 'ja-Hrkt'}, // Japanese using Kana script
  {localeCode: 'uk'}, // Ukrainian
  {localeCode: 'en-NZ'}, // English as spoken in New Zealand
  {localeCode: 'en'}, // English as spoken in New Zealand
  {localeCode: 'ja'}, // Japanese (using both Kanji and Kana)
  {localeCode: 'und-Zsye'}, // Emoji
];

describe('CoreService', () => {
  let service: IzCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: IzLocaleDefinitions, useValue: testDefinitions}],
    });
    service = TestBed.inject(IzCoreService);
  });

  it('should create an instance', () => {
    expect(service).toBeInstanceOf(IzCoreService);
  });

  describe('getLocaleCodesInOrderOfPreference', () => {
    let observer: Observer<IzLocaleCode[]>;
    let nextSpy: jasmine.Spy<(typeof observer)['next']>;

    beforeEach(() => {
      observer = {
        next: () => {},
        error: () => fail('observer error callback called'),
        complete: () => fail('observer complete callback called'),
      };
      nextSpy = spyOn(observer, 'next');
    });

    it('should emit preferred locale codes', () => {
      service.getLocaleCodesInOrderOfPreference().subscribe(observer);
      expect(nextSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getLocaleDefinitionsInOrderOfPreference', () => {
    let observer: Observer<IzLocaleDefinition[]>;
    let nextSpy: jasmine.Spy<(typeof observer)['next']>;

    beforeEach(() => {
      observer = {
        next: () => {},
        error: () => fail('observer error callback called'),
        complete: () => fail('observer complete callback called'),
      };
      nextSpy = spyOn(observer, 'next');
    });

    it('should emit preferred locale definitions', () => {
      service.getLocaleDefinitionsInOrderOfPreference().subscribe(observer);
      expect(nextSpy).toHaveBeenCalledTimes(1);
    });
  });
});

describe('CoreService without locales configured', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should throw error while creating an instance', () => {
    expect(() => {
      TestBed.inject(IzCoreService);
    }).toThrowError(TypeError);
  });
});

describe('CoreService with plugins', () => {
  class PluginMock implements IzPluginLink {
    constructor(
      private delay: number,
    ) {}

    async onLocalePreferenceChangeStart(): Promise<void> {
      await new Promise(res => setTimeout(res, this.delay));
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: IzLocaleDefinitions, useValue: testDefinitions},
        {provide: IzPluginLinks, multi: true, useValue: new PluginMock(500)},
        {provide: IzPluginLinks, multi: true, useValue: new PluginMock(1000)},
      ],
    });
  });

  describe('getLocaleCodesInOrderOfPreference', () => {
    let observer: Observer<IzLocaleCode[]>;
    let nextSpy: jasmine.Spy<(typeof observer)['next']>;

    beforeEach(() => {
      observer = {
        next: () => {},
        error: () => fail('observer error callback called'),
        complete: () => fail('observer complete callback called'),
      };
      nextSpy = spyOn(observer, 'next');
    });

    it('should emit only after modules are done changing preferrence', fakeAsync(inject([IzCoreService], (service: IzCoreService) => {
      service.getLocaleCodesInOrderOfPreference().subscribe(observer);

      expect(nextSpy).not.toHaveBeenCalled();

      tick(500);
      expect(nextSpy).not.toHaveBeenCalled();

      tick(500);
      expect(nextSpy).toHaveBeenCalledTimes(1);
    })));
  });

  describe('getLocaleDefinitionsInOrderOfPreference', () => {
    let observer: Observer<IzLocaleDefinition[]>;
    let nextSpy: jasmine.Spy<(typeof observer)['next']>;

    beforeEach(() => {
      observer = {
        next: () => {},
        error: () => fail('observer error callback called'),
        complete: () => fail('observer complete callback called'),
      };
      nextSpy = spyOn(observer, 'next');
    });

    it('should emit only after modules are done changing preferrence', fakeAsync(inject([IzCoreService], (service: IzCoreService) => {
      service.getLocaleDefinitionsInOrderOfPreference().subscribe(observer);

      expect(nextSpy).not.toHaveBeenCalled();

      tick(500);
      expect(nextSpy).not.toHaveBeenCalled();

      tick(500);
      expect(nextSpy).toHaveBeenCalledTimes(1);
    })));
  });

});

describe('CoreService locale preference', () => {
  let service: IzCoreService;
  let codesObserver: Observer<IzLocaleCode[]>;
  let definitionsObserver: Observer<IzLocaleDefinition[]>;
  let codesNextSpy: jasmine.Spy<(typeof codesObserver)['next']>;
  let definitionsNextSpy: jasmine.Spy<(typeof definitionsObserver)['next']>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: IzLocaleDefinitions, useValue: testDefinitions}],
    });

    codesObserver = {
      next: () => {},
      error: () => fail('observer error callback called'),
      complete: () => fail('observer complete callback called'),
    };
    definitionsObserver = {
      next: () => {},
      error: () => fail('observer error callback called'),
      complete: () => fail('observer complete callback called'),
    };

    codesNextSpy = spyOn(codesObserver, 'next');
    definitionsNextSpy = spyOn(definitionsObserver, 'next');
  });

  function prepareUsingMockedLocales(navigatorPreferredLocales: string[], userPreferredLocale: string | null): void {
    spyOn(localStorage, 'getItem').withArgs(LOCALSTORAGE_LOCALE_CODE).and.returnValue(userPreferredLocale);
    spyOnProperty(navigator, 'languages', 'get').and.returnValue(navigatorPreferredLocales);
    spyOnProperty(navigator, 'language', 'get').and.returnValue(undefined);

    service = TestBed.inject(IzCoreService);

    service.getLocaleCodesInOrderOfPreference().subscribe(codesObserver);
    service.getLocaleDefinitionsInOrderOfPreference().subscribe(definitionsObserver);
  }


  it('should use original preference if no compatible locale is found', () => {
    prepareUsingMockedLocales(['de', 'ko-KR'], null);
    const expected = ['ja-Hrkt', 'uk', 'en-NZ', 'en', 'ja', 'und-Zsye'];

    expect(codesNextSpy).toHaveBeenCalledOnceWith(expected);
    expect(definitionsNextSpy).toHaveBeenCalledOnceWith(expected.map(localeCode => ({localeCode})));
  });

  it('should prefer all supported locales using order of browser preference, then the rest using original preference', () => {
    prepareUsingMockedLocales(['de', 'ko-KR', 'uk', 'en'], null);
    const expected = ['uk', 'en', 'ja-Hrkt', 'en-NZ', 'ja', 'und-Zsye'];

    expect(codesNextSpy).toHaveBeenCalledOnceWith(expected);
    expect(definitionsNextSpy).toHaveBeenCalledOnceWith(expected.map(localeCode => ({localeCode})));
  });

  it('should also prefer short locale code if preferring a long one - after all long ones', () => {
    prepareUsingMockedLocales(['de', 'ko-KR', 'ja-Hrkt', 'en-NZ'], null);
    const expected = ['ja-Hrkt', 'en-NZ', 'ja', 'en', 'uk', 'und-Zsye'];

    expect(codesNextSpy).toHaveBeenCalledOnceWith(expected);
    expect(definitionsNextSpy).toHaveBeenCalledOnceWith(expected.map(localeCode => ({localeCode})));
  });

  it('should also prefer short locale code if preferring a long one where the long is not supported locale code but short code is', () => {
    prepareUsingMockedLocales(['de', 'ko-KR', 'ja-Hrkt', 'uk-UA', 'en-AU'], null);
    const expected = ['ja-Hrkt', 'ja', 'uk', 'en', 'en-NZ', 'und-Zsye'];

    expect(codesNextSpy).toHaveBeenCalledOnceWith(expected);
    expect(definitionsNextSpy).toHaveBeenCalledOnceWith(expected.map(localeCode => ({localeCode})));
  });

  it('should prefer user-preferred locale more than browser-preferred locales', () => {
    prepareUsingMockedLocales(['de', 'ko-KR', 'ja-Hrkt'], 'und-Zsye');
    const expected = ['und-Zsye', 'ja-Hrkt', 'ja', 'uk', 'en-NZ', 'en'];

    expect(codesNextSpy).toHaveBeenCalledOnceWith(expected);
    expect(definitionsNextSpy).toHaveBeenCalledOnceWith(expected.map(localeCode => ({localeCode})));
  });

  it('should not use user-preferred locale if it is not a supported locale', () => {
    prepareUsingMockedLocales(['de', 'ko-KR', 'ja-Hrkt'], 'ca');
    const expected = ['ja-Hrkt', 'ja', 'uk', 'en-NZ', 'en', 'und-Zsye'];

    expect(codesNextSpy).toHaveBeenCalledOnceWith(expected);
    expect(definitionsNextSpy).toHaveBeenCalledOnceWith(expected.map(localeCode => ({localeCode})));
  });

  it('should prefer user-preferred locale when changed during runtime', () => {
    prepareUsingMockedLocales(['de', 'ko-KR', 'ja-Hrkt'], 'und-Zsye');
    expect(codesNextSpy).toHaveBeenCalledTimes(1);
    expect(definitionsNextSpy).toHaveBeenCalledTimes(1);

    // known long code
    service.preferLocaleCode('en-NZ');

    expect(codesNextSpy).toHaveBeenCalledTimes(2);
    expect(definitionsNextSpy).toHaveBeenCalledTimes(2);

    // known short code
    service.preferLocaleCode('ja');

    expect(codesNextSpy).toHaveBeenCalledTimes(3);
    expect(definitionsNextSpy).toHaveBeenCalledTimes(3);

    // unknown code
    service.preferLocaleCode('ca');

    expect(codesNextSpy).toHaveBeenCalledTimes(4);
    expect(definitionsNextSpy).toHaveBeenCalledTimes(4);

    // unknown code - exact match needed for user-preferred locale code
    service.preferLocaleCode('en-AU');

    expect(codesNextSpy).toHaveBeenCalledTimes(5);
    expect(definitionsNextSpy).toHaveBeenCalledTimes(5);

    expect(codesNextSpy.calls.allArgs()).toEqual([
      [['und-Zsye', 'ja-Hrkt', 'ja', 'uk', 'en-NZ', 'en']],
      [['en-NZ', 'ja-Hrkt', 'ja', 'uk', 'en', 'und-Zsye']],
      [['ja', 'ja-Hrkt', 'uk', 'en-NZ', 'en', 'und-Zsye']],
      [['ja-Hrkt', 'ja', 'uk', 'en-NZ', 'en', 'und-Zsye']],
      [['ja-Hrkt', 'ja', 'uk', 'en-NZ', 'en', 'und-Zsye']],
    ]);
    expect(definitionsNextSpy.calls.allArgs()).toEqual([
      [['und-Zsye', 'ja-Hrkt', 'ja', 'uk', 'en-NZ', 'en'].map(localeCode => ({localeCode}))],
      [['en-NZ', 'ja-Hrkt', 'ja', 'uk', 'en', 'und-Zsye'].map(localeCode => ({localeCode}))],
      [['ja', 'ja-Hrkt', 'uk', 'en-NZ', 'en', 'und-Zsye'].map(localeCode => ({localeCode}))],
      [['ja-Hrkt', 'ja', 'uk', 'en-NZ', 'en', 'und-Zsye'].map(localeCode => ({localeCode}))],
      [['ja-Hrkt', 'ja', 'uk', 'en-NZ', 'en', 'und-Zsye'].map(localeCode => ({localeCode}))],
    ]);
  });
});

/*


// tslint:disable-next-line: no-null-keyword
spyOn(localStorage, 'getItem').withArgs(LOCALSTORAGE_LOCALE_CODE).and.returnValue(null);
spyOnProperty(navigator, 'language', 'get').and.returnValue('de');
spyOnProperty(navigator, 'languages', 'get').and.returnValue(['de-AT', 'de']);




['ja', 'ja-JP', 'ja-Hrkt', 'uk', 'eo-CZ', 'eo-CN', 'und-Zsye']



{localeCode: 'ja'},
{localeCode: 'ja-JP'},
{localeCode: 'ja-Hrkt'},
{localeCode: 'uk'},
{localeCode: 'eo-CZ'},
{localeCode: 'eo-CN'},
{localeCode: 'und-Zsye'},

*/
