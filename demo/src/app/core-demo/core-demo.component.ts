// tslint:disable member-ordering
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IzCoreService, IzLocaleCode, IzLocaleDefinitions } from '@ization/core';

@Component({
  selector: 'iz-core-demo',
  templateUrl: './core-demo.component.html',
  styleUrls: ['./core-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreDemoComponent {
  constructor(
    private coreService: IzCoreService,
    public localeDefinitionsInOriginalOrder: IzLocaleDefinitions,
  ) {}

  localeCodesSupportedByBrowser = navigator.languages || [navigator.language];
  localeCodePreferredByUser$ = this.coreService.getPreferredLocaleCode();
  localeDefinitionsInOrderOfPreference$ = this.coreService.getLocaleDefinitionsInOrderOfPreference();

  userPreferredLocaleChanged(localeCode: IzLocaleCode | 'None'): void {
    if (localeCode === 'None') {
      this.coreService.clearLocaleCodePreference();
    } else {
      this.coreService.preferLocaleCode(localeCode);
    }
  }
}
