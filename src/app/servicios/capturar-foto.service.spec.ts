import { TestBed } from '@angular/core/testing';

import { CapturarFotoService } from './capturar-foto.service';

describe('CapturarFotoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CapturarFotoService = TestBed.get(CapturarFotoService);
    expect(service).toBeTruthy();
  });
});
