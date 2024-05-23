import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BaseptoPage } from './basepto.page';

describe('BaseptoPage', () => {
  let component: BaseptoPage;
  let fixture: ComponentFixture<BaseptoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseptoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BaseptoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
