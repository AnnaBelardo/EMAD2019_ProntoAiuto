import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CittadinoStatistichePage } from './cittadino-statistiche.page';

describe('CittadinoStatistichePage', () => {
  let component: CittadinoStatistichePage;
  let fixture: ComponentFixture<CittadinoStatistichePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CittadinoStatistichePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CittadinoStatistichePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
