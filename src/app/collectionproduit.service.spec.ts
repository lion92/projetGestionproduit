import { TestBed } from '@angular/core/testing';

import { CollectionproduitService } from './collectionproduit.service';

describe('CollectionproduitService', () => {
  let service: CollectionproduitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionproduitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
