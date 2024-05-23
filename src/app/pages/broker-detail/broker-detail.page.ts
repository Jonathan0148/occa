import { Component } from '@angular/core';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import {
  BrokerService,
} from '../../providers';

@Component({
  selector: 'app-broker-detail',
  templateUrl: './broker-detail.page.html',
  styleUrls: ['./broker-detail.page.scss'],
})
export class BrokerDetailPage {
  brokerID: any;
  broker: any;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public route: ActivatedRoute,
    public router: Router,
    private brokerService: BrokerService
  ) {
    this.brokerID = this.route.snapshot.paramMap.get('id');

    this.broker = this.brokerService.getItem(this.brokerID) ?
    this.brokerService.getItem(this.brokerID) :
    this.brokerService.findAll()[0];
  }

  async scheduleVisit(broker) {
    let navigationExtras: NavigationExtras = {
      state: {
        broker: broker
      }
    };
    
    this.router.navigate(['schedule-visit'], navigationExtras);
  };

  async brokerChat(broker) {
    let navigationExtras: NavigationExtras = {
      state: {
        broker: broker
      }
    };
    
    this.router.navigate(['broker-chat'], navigationExtras);
  }

}
