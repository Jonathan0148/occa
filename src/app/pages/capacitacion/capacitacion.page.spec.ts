import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CapacitacionPage } from './capacitacion.page';

describe('CapacitacionPage', () => {
  let component: CapacitacionPage;
  let fixture: ComponentFixture<CapacitacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapacitacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CapacitacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
