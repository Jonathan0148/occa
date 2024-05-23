import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccionPage } from './accion.page';

describe('AccionPage', () => {
  let component: AccionPage;
  let fixture: ComponentFixture<AccionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
