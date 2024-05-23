import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerDetailPage } from './broker-detail.page';

describe('BrokerDetailPage', () => {
  let component: BrokerDetailPage;
  let fixture: ComponentFixture<BrokerDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrokerDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
