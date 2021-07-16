import { TestBed } from '@angular/core/testing';

import { IzMomentPluginLinkService } from './plugin-link.service';

describe('IzMomentPluginLinkService', () => {
  let service: IzMomentPluginLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IzMomentPluginLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
