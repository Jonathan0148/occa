import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DomoticaPage } from './domotica.page';

describe('DomoticaPage', () => {
  let component: DomoticaPage;
  let fixture: ComponentFixture<DomoticaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomoticaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DomoticaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
