import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewObjectPage } from './view-object.page';

describe('ViewObjectPage', () => {
  let component: ViewObjectPage;
  let fixture: ComponentFixture<ViewObjectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewObjectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewObjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
