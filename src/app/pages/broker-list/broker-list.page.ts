import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import {
  BrokerService
} from '../../providers';

import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-broker-list',
  templateUrl: './broker-list.page.html',
  styleUrls: ['./broker-list.page.scss'],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(-100px,0,0)` }), { optional: true }),
        query(':enter', stagger('300ms', [animate('500ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})
export class BrokerListPage {
  brokers: Array<any>;

  constructor(
    public navCtrl: NavController,
    private brokerService: BrokerService
  ) {
    this.brokers = this.brokerService.findAll();
  }

}
