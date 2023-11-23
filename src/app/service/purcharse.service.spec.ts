import { TestBed } from '@angular/core/testing';

import { PurcharseService } from './purcharse.service';

describe('PurcharseService', () => {
  let service: PurcharseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurcharseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
