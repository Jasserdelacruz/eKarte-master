import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaTarjetaPage } from './nueva-tarjeta.page';

describe('NuevaTarjetaPage', () => {
  let component: NuevaTarjetaPage;
  let fixture: ComponentFixture<NuevaTarjetaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaTarjetaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaTarjetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
