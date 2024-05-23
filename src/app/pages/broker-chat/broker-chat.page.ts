import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  BrokerService,
} from '../../providers';

@Component({
  selector: 'app-broker-chat',
  templateUrl: './broker-chat.page.html',
  styleUrls: ['./broker-chat.page.scss'],
})
export class BrokerChatPage implements OnInit {
  brokerID: any;
  broker: any;

  conversation: any;

  input = '';

  constructor(
    private brokerService: BrokerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.brokerID = this.router.getCurrentNavigation().extras.state.broker;
      }
    });
  }

  ngOnInit() {
    this.broker = this.brokerService.getItem(this.brokerID) ?
    this.brokerService.getItem(this.brokerID) :
    this.brokerService.findAll()[0];
  }

  ionViewDidEnter() {
    this.conversation = [
      { text: 'Hey, how can i help you?', sender: 0, image: this.broker.picture }
    ]
    setTimeout(() => {
      this.scrollToBottom()
    }, 10)
  }

  send() {
    if (this.input !== '') {
      this.conversation.push({ text: this.input, sender: 1, image: 'assets/img/avatar.jpeg' });
      this.input = '';
      setTimeout(() => {
        this.scrollToBottom()
      }, 100)
    }
  }

  scrollToBottom(){
    let content = document.getElementById("chat-container");
    let parent = document.getElementById("chat-parent");
    let scrollOptions = {
      left: 0,
      top: content.offsetHeight
    }
    
    parent.scrollTo(scrollOptions)
  }

}
