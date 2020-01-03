import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestisciRichiestaPage } from './gestisci-richiesta.page';

describe('GestisciRichiestaPage', () => {
  let component: GestisciRichiestaPage;
  let fixture: ComponentFixture<GestisciRichiestaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestisciRichiestaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestisciRichiestaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
