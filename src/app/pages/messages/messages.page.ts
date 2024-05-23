import { Component, ViewChild, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { MessageService } from '../../providers/message/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  messages: Array<any> = [];

  @ViewChild('slidingList', { static: false }) slidingList: IonItemSliding;

  constructor(public messageService: MessageService) { }

  ngOnInit() {
    this.getMessages();
  }

  async deleteItem(message) {
    this.messageService.delMessage(message);
    await this.slidingList.close().then(() => {});
  }

  getMessages() {
    this.messages = this.messageService.getMessages();
  }
}
