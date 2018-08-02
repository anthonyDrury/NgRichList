import { TestBed, inject } from '@angular/core/testing';

import { ListPipeService } from './list-pipe.service';

describe('ListPipeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListPipeService]
    });
  });

  it('should be created', inject([ListPipeService], (service: ListPipeService) => {
    expect(service).toBeTruthy();
  }));
});
