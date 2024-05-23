import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FuncionesPage } from './funciones.page';

describe('FuncionesPage', () => {
  let component: FuncionesPage;
  let fixture: ComponentFixture<FuncionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuncionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FuncionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
