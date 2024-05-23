import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MdetallePage } from './mdetalle.page';

describe('MdetallePage', () => {
  let component: MdetallePage;
  let fixture: ComponentFixture<MdetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdetallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MdetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
