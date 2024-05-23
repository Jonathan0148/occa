import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';

import { ActivatedRoute, Router } from '@angular/router';

import {
  InvoicesService,
  TranslateProvider
} from '../../providers';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})

export class CheckoutPage implements OnInit {
  invoiceID: any;
  invoice: any;
  paymethods = 'creditcard';
  orderNumber: number = Math.floor(Math.random() * 10000);

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private invoicesService: InvoicesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.invoiceID = this.router.getCurrentNavigation().extras.state.invoice;
      }
    });
  }

  ngOnInit() {
    this.invoice = this.invoicesService.getItem(this.invoiceID) ?
    this.invoicesService.getItem(this.invoiceID) :
    this.invoicesService.findAll()[0];
  }

  async checkoutInvoice() {
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(async l => {
      const toast = await this.toastCtrl.create({
        showCloseButton: false,
        cssClass: 'bg-profile',
        message: 'Bill paid successfully!',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();

      setTimeout(() => {
        loader.dismiss();
        toast.present();
        // back to home page
        this.navCtrl.navigateForward('home-results');
      }, 3000);

    });
    // end
  }

}
