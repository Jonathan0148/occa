import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReconocimientoPage } from './reconocimiento.page';

describe('ReconocimientoPage', () => {
  let component: ReconocimientoPage;
  let fixture: ComponentFixture<ReconocimientoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReconocimientoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReconocimientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
