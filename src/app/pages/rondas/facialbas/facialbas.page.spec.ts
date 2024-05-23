import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FacialbasPage } from './facialbas.page';

describe('FacialbasPage', () => {
  let component: FacialbasPage;
  let fixture: ComponentFixture<FacialbasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacialbasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FacialbasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
