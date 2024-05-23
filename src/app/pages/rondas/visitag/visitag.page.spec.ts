import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisitagPage } from './visitag.page';

describe('VisitagPage', () => {
  let component: VisitagPage;
  let fixture: ComponentFixture<VisitagPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitagPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisitagPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
