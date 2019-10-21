import { TestBed } from '@angular/core/testing';

import { AlmacenamientoTarjetasService } from './almacenamiento-tarjetas.service';

describe('AlmacenamientoTarjetasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlmacenamientoTarjetasService = TestBed.get(AlmacenamientoTarjetasService);
    expect(service).toBeTruthy();
  });
});
