import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RonpuntosPage } from './ronpuntos.page';

describe('RonpuntosPage', () => {
  let component: RonpuntosPage;
  let fixture: ComponentFixture<RonpuntosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RonpuntosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RonpuntosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
