import { Injectable, Optional } from '@angular/core';
import { uniq } from 'lodash';
import { from, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { delayWhen, map, mapTo, tap, withLatestFrom } from 'rxjs/operators';
import { IzPluginLinks } from '../tokens/plugin-links.token';
import { IzLocaleDefinitions } from '../tokens/locale-definitions.token';
import { IzLocaleDefinition } from '../types/locale-definition';
import { IzLocaleCode } from '../types/locale-code';

/** @internal */
export const LOCALSTORAGE_LOCALE_CODE = '@ization/core_LOCALE_CODE';

/**
 * Main ization service that handles locales and their preference
 * @category Services
 */
@Injectable({providedIn: 'root'})
export class IzCoreService {
  private localeDefinitions: IzLocaleDefinitions;

  constructor(
    @Optional() localeDefinitions: IzLocaleDefinitions | null,
    @Optional() private pluginLinks: IzPluginLinks | null,
  ) {
    if (!localeDefinitions || localeDefinitions.length === 0) {
      throw new TypeError('@ization/core: You must specify at least one locale using IzCoreModule.withLocales(locales) import.');
    }

    this.localeDefinitions = localeDefinitions;

    this.subscribeSubjects();
    this.initialize();
  }

  private readonly preferredLocaleCode$ = new ReplaySubject<IzLocaleCode | undefined>(1);
  private readonly detectedPreference$ = new Subject<IzLocaleCode[]>();

  private readonly localeDefinitionsInOrderOfPreference$ = new ReplaySubject<IzLocaleDefinition[]>(1);
  private readonly localeCodesInOrderOfPreference$ = new ReplaySubject<IzLocaleCode[]>(1);
  private readonly localePreferenceChanged$ = new Subject<void>();

  private subscribeSubjects(): void {
    this.preferredLocaleCode$.pipe(
      withLatestFrom(this.detectedPreference$),
      map(([preferredLocaleCode, detectedPreference]) => {
        if (preferredLocaleCode && detectedPreference.includes(preferredLocaleCode)) {
          return [
            preferredLocaleCode,
            ...detectedPreference.filter(localeCode => localeCode !== preferredLocaleCode),
          ];
        }
        return detectedPreference;
      }),
      map(preferredLocaleCodes => preferredLocaleCodes
        // tslint:disable-next-line: no-non-null-assertion
        .map(preferredLocaleCode => this.localeDefinitions.find(({localeCode}) => localeCode === preferredLocaleCode)!),
      ),
      delayWhen(localeDefinitions => {
        if (this.pluginLinks) {
          return from(Promise.all<void>(this.pluginLinks.map(module => module.onLocalePreferenceChangeStart?.(localeDefinitions))));
        }
        return of(undefined);
      }),
      tap(localeDefinitions => this.pluginLinks?.forEach(module => module.onLocalePreferenceChangeFinish?.(localeDefinitions))),
    ).subscribe(this.localeDefinitionsInOrderOfPreference$);

    this.localeDefinitionsInOrderOfPreference$.pipe(
      map(localeDefinitions => localeDefinitions.map(({localeCode}) => localeCode)),
    ).subscribe(this.localeCodesInOrderOfPreference$);

    this.localeDefinitionsInOrderOfPreference$.pipe(
      mapTo(undefined),
    ).subscribe(this.localePreferenceChanged$);
  }

  private async initialize(): Promise<void> {
    // get all locale codes preferred by browser
    let browserLocaleCodes: IzLocaleCode[] = [
      ...(navigator.languages || []),
      navigator.language,
    ]
      .filter((code): code is string => typeof code === 'string');

    // get plain (locale only) locale codes preferred by browser
    let plainBrowserLocaleCodes: IzLocaleCode[] = browserLocaleCodes.map(code => code.replace(/\W.*$/, ''));

    // get supported locale codes
    let supportedLocaleCodes = this.localeDefinitions.map(({localeCode}) => localeCode);

    // final preference list of locale codes
    let preferredLocaleCodes = uniq([
      ...browserLocaleCodes,
      ...plainBrowserLocaleCodes,
      ...supportedLocaleCodes,
    ])
      // only consider supported locale codes
      .filter(code => supportedLocaleCodes.includes(code));

    this.detectedPreference$.next(preferredLocaleCodes);

    // also load possible user override
    this.preferredLocaleCode$.next(localStorage.getItem(LOCALSTORAGE_LOCALE_CODE) || undefined);
  }

  /**
   * Get a locale code that is used as the most preferred locale for the user
   */
  getPreferredLocaleCode(): Observable<IzLocaleCode | undefined> {
    return this.preferredLocaleCode$.asObservable();
  }

  /**
   * Get an observable that emits each time a locale preference changes
   */
   getLocalePreferenceChanged(): Observable<void> {
    return this.localePreferenceChanged$.asObservable();
  }

  /**
   * Get a list of locale codes in order of preference as altered by user configuration
   */
  getLocaleCodesInOrderOfPreference(): Observable<IzLocaleCode[]> {
    return this.localeCodesInOrderOfPreference$.asObservable();
  }

  /**
   * Get a list of locale definitions in order of preference as altered by user configuration
   */
  getLocaleDefinitionsInOrderOfPreference(): Observable<IzLocaleDefinition[]> {
    return this.localeDefinitionsInOrderOfPreference$.asObservable();
  }

  /**
   * Set a locale code to be used as the most preferred locale for the user and save it for future use
   * @param localeCode locale code to be used
   */
  preferLocaleCode(localeCode: IzLocaleCode): void {
    this.preferredLocaleCode$.next(localeCode);
    localStorage.setItem(LOCALSTORAGE_LOCALE_CODE, localeCode);
  }

  /**
   * Clear a saved locale code used as the most preferred locale for the user
   */
  clearLocaleCodePreference(): void {
    this.preferredLocaleCode$.next(undefined);
    localStorage.removeItem(LOCALSTORAGE_LOCALE_CODE);
  }
}
