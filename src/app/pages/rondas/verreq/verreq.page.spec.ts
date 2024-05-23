import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerreqPage } from './verreq.page';

describe('VerreqPage', () => {
  let component: VerreqPage;
  let fixture: ComponentFixture<VerreqPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerreqPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerreqPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
