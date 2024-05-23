import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReqdetallePage } from './reqdetalle.page';

describe('ReqdetallePage', () => {
  let component: ReqdetallePage;
  let fixture: ComponentFixture<ReqdetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqdetallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReqdetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
