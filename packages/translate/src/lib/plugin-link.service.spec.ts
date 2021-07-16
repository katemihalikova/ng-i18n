import { TestBed } from '@angular/core/testing';

import { IzTranslatePluginLinkService } from './plugin-link.service';
import { IzTranslateModule } from './translate.module';

describe('IzTemporalPluginLinkService', () => {
  let service: IzTranslatePluginLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IzTranslateModule.withConfig({
          translationLoader: async () => ({}),
          fallbackLocaleCode: 'en',
        }),
      ],
    });
    service = TestBed.inject(IzTranslatePluginLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
