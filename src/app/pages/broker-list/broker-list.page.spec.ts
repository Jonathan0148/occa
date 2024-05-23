import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerListPage } from './broker-list.page';

describe('BrokerListPage', () => {
  let component: BrokerListPage;
  let fixture: ComponentFixture<BrokerListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrokerListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
