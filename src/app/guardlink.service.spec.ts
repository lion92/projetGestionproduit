import { TestBed } from '@angular/core/testing';

import { GuardlinkService } from './guardlink.service';

describe('GuardlinkService', () => {
  let service: GuardlinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardlinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
