import { TestBed } from '@angular/core/testing';

import { ProductListMockApiService } from './product-list-mock-api.service';

describe('ProductListMockApiService', () => {
  let service: ProductListMockApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductListMockApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
