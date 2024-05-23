import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MinutasPage } from './minutas.page';

describe('MinutasPage', () => {
  let component: MinutasPage;
  let fixture: ComponentFixture<MinutasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinutasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MinutasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
