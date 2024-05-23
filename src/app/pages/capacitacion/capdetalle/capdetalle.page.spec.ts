import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CapdetallePage } from './capdetalle.page';

describe('CapdetallePage', () => {
  let component: CapdetallePage;
  let fixture: ComponentFixture<CapdetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapdetallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CapdetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
