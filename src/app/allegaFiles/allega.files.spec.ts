import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {AllegaFile} from './allega.files';

describe('AllegaFile', () => {
  let component: AllegaFile;
  let fixture: ComponentFixture<AllegaFile>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllegaFile ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllegaFile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
