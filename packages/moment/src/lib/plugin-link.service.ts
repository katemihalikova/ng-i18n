import { Injectable } from '@angular/core';

import { IzLocaleCode, IzLocaleDefinition, IzPluginLink } from '@ization/core';

/**
 * Plugin link class for `@ization/moment`. See [[`IzPluginLink`]] for more info.
 * @category Services
 */
@Injectable({providedIn: 'root'})
export class IzMomentPluginLinkService implements IzPluginLink {
  /** Preferred locale codes used by pipes to choose the best locale */
  public preferredLocaleCodes?: IzLocaleCode[];

  public onLocalePreferenceChangeFinish(localeDefinitions: IzLocaleDefinition[]): void {
    this.preferredLocaleCodes = localeDefinitions.map(({localeCode, momentLocaleCode}) => momentLocaleCode || localeCode);
  }
}
