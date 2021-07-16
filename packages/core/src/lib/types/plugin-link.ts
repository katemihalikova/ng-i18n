import { IzLocaleDefinition } from './locale-definition';

/**
 * Observer interface that each plugin that subscribes into this module must implement and provide via Angular dependency injection via [[`IzPluginLinks`]] multi injection token in their providers
 */
export interface IzPluginLink {
  onLocalePreferenceChangeStart?(localeDefinitions: IzLocaleDefinition[]): Promise<void>;
  onLocalePreferenceChangeFinish?(localeDefinitions: IzLocaleDefinition[]): void;
}
