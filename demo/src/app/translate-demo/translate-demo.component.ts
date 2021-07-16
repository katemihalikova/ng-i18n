// tslint:disable member-ordering
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IzLocaleCode } from '@ization/core';
import { IzTranslatePluginLinkService } from '@ization/translate';

@Component({
  selector: 'iz-translate-demo',
  templateUrl: './translate-demo.component.html',
  styleUrls: ['./translate-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslateDemoComponent {
  constructor(
    private linkService: IzTranslatePluginLinkService,
  ) {}

  getActiveLocales(): IzLocaleCode[] | undefined {
    return this.linkService.translations?.availableLocales;
  }

  translations: Array<{key: string, params?: Array<Record<string, unknown>>, skipSpacer?: true}> = [
    {key: 'SIMPLE'},
    {key: 'NESTED.SHALLOW', skipSpacer: true},
    {key: 'NESTED.VERY.VERY.DEEP', skipSpacer: true},

    {key: 'EN_ONLY'},
    {key: 'CS_ONLY', skipSpacer: true},
    {key: 'JA_ONLY', skipSpacer: true},
    {key: 'EN_CS_ONLY', skipSpacer: true},
    {key: 'EN_JA_ONLY', skipSpacer: true},
    {key: 'CS_JA_ONLY', skipSpacer: true},
  ];

  translationsWithParams: Array<{key: string, params: Array<Record<string, unknown>>}> = [
    {key: 'VARIABLE', params: [
      {color: 'purple'},
      {color: 'electric violet'},
    ]},
    {key: 'SELECT', params: [
      {thing: 'pc'},
      {thing: 'dog'},
      {thing: 'bed'},
      {},
    ]},
    {key: 'PLURAL', params: [
      {nr: 0},
      {nr: 1},
      {nr: 4},
    ]},
    {key: 'PLURAL_OFFSET', params: [
      {nr: 0},
      {nr: 1},
      {nr: 2},
      {nr: 4},
      {nr: 7},
    ]},
    {key: 'SELECTORDINAL', params: [
      {nr: 1},
      {nr: 2},
      {nr: 3},
      {nr: 5},
      {nr: 11},
      {nr: 21},
    ]},
  ];

  now = Temporal.now.plainDateISO();
}
