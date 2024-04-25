import { TestBed } from '@angular/core/testing';

import { UnidadeControlService } from './unidade-control.service';

describe('UnidadeControlService', () => {
  let service: UnidadeControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidadeControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
