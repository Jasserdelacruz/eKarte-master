import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MistarjetasPage } from './mistarjetas.page';

describe('MistarjetasPage', () => {
  let component: MistarjetasPage;
  let fixture: ComponentFixture<MistarjetasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MistarjetasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MistarjetasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
