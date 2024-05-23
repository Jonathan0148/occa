import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BycategoryPage } from './bycategory.page';

describe('BycategoryPage', () => {
  let component: BycategoryPage;
  let fixture: ComponentFixture<BycategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BycategoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BycategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
