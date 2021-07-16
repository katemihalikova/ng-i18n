import { TestBed } from '@angular/core/testing';

import { IzTemporalPluginLinkService } from './plugin-link.service';

describe('IzTemporalPluginLinkService', () => {
  let service: IzTemporalPluginLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IzTemporalPluginLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
