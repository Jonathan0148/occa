import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoaccesoPage } from './noacceso.page';

describe('NoaccesoPage', () => {
  let component: NoaccesoPage;
  let fixture: ComponentFixture<NoaccesoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoaccesoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoaccesoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
