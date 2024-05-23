import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DirectorioPage } from './directorio.page';

describe('DirectorioPage', () => {
  let component: DirectorioPage;
  let fixture: ComponentFixture<DirectorioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DirectorioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
