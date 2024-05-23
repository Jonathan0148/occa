import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecibirPage } from './recibir.page';

describe('RecibirPage', () => {
  let component: RecibirPage;
  let fixture: ComponentFixture<RecibirPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecibirPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecibirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
