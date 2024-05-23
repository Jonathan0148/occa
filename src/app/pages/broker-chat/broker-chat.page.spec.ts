import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerChatPage } from './broker-chat.page';

describe('BrokerChatPage', () => {
  let component: BrokerChatPage;
  let fixture: ComponentFixture<BrokerChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrokerChatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
