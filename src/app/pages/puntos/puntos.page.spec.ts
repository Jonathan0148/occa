import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PuntosPage } from './puntos.page';

describe('PuntosPage', () => {
  let component: PuntosPage;
  let fixture: ComponentFixture<PuntosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PuntosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
