import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NavController, LoadingController, ToastController } from '@ionic/angular';

import {
  BrokerService,
} from '../../providers';

@Component({
  selector: 'app-schedule-visit',
  templateUrl: './schedule-visit.page.html',
  styleUrls: ['./schedule-visit.page.scss'],
})
export class ScheduleVisitPage implements OnInit {
  brokerID: any;
  broker: any;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
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

  async sendSchedule() {
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(async l => {
      const toast = await this.toastCtrl.create({
        showCloseButton: true,
        cssClass: 'bg-profile',
        message: 'Visit scheduled with Success!',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
      this.navCtrl.navigateForward('/home-results');
    });
    // end
  }

}
