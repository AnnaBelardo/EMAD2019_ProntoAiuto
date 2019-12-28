import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllegaFilesPage } from './allega-files.page';

describe('AllegaFilesPage', () => {
  let component: AllegaFilesPage;
  let fixture: ComponentFixture<AllegaFilesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllegaFilesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllegaFilesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
