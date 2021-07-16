import { Component, Input } from '@angular/core';
import { IzLocaleCode, IzLocaleDefinition } from '@ization/core';

@Component({
  selector: 'iz-locale-definition',
  templateUrl: './locale-definition.component.html',
})
export class LocaleDefinitionComponent {
  @Input() definition?: IzLocaleDefinition;

  hasSomeOverride(definition: IzLocaleDefinition): boolean {
    return Object.keys(definition).length > 1;
  }

  getOverrides(definition: IzLocaleDefinition): Array<{plugin: string, code: IzLocaleCode}> {
    return [
      {plugin: '@ization/temporal', code: definition.temporalLocaleCode},
      {plugin: '@ization/translate', code: definition.translateLocaleCode},
    ]
      .filter(({code}) => code !== undefined) as Array<{plugin: string, code: IzLocaleCode}>;
  }
}
