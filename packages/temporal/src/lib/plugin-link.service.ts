import { Injectable } from '@angular/core';
import { IzLocaleCode, IzLocaleDefinition, IzPluginLink } from '@ization/core';

/**
 * Plugin link class for `@ization/temporal`. See [[`IzPluginLink`]] for more info.
 * @category Services
 */
@Injectable({providedIn: 'root'})
export class IzTemporalPluginLinkService implements IzPluginLink {
  public preferredLocaleCodes?: IzLocaleCode[];

  public onLocalePreferenceChangeFinish(localeDefinitions: IzLocaleDefinition[]): void {
    this.preferredLocaleCodes = localeDefinitions.map(({localeCode, temporalLocaleCode}) => temporalLocaleCode || localeCode);
  }
}
