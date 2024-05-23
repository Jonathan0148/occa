import { Component } from '@angular/core';
import { NavController, ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { ImagePage } from './../modal/image/image.page';

import {
  PropertyService,
  // BrokerService,
} from '../../providers';

import { environment } from '../../../environments/environment';

import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.page.html',
  styleUrls: ['./property-detail.page.scss'],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(0,10px,0)` }), { optional: true }),
        query(':enter', stagger('300ms', [animate('600ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})
export class PropertyDetailPage {

  propertyID: any;
  property: any;
  propertyopts: String = 'description';

  constructor (
    public asCtrl: ActionSheetController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public route: ActivatedRoute,
    public router: Router,
    private propertyService: PropertyService,
  ) {
    this.propertyID = this.route.snapshot.paramMap.get('id');

    this.property = this.propertyService.getItem(this.propertyID) ?
    this.propertyService.getItem(this.propertyID) :
    this.propertyService.getProperties()[0];
  }

  ionViewWillEnter() {
  }

  async presentImage(image: any) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      componentProps: { value: image }
    });
    return await modal.present();
  }


  favorite(property) {
    this.propertyService.favorite(property)
        .then(async res => {
            const toast = await this.toastCtrl.create({
              showCloseButton: true,
                message: 'Property added to your favorites',
                duration: 2000,
                position: 'bottom'
            });

            toast.present();
        });
  }

  async share() {
    const actionSheet = await this.asCtrl.create({
      header: 'Share Property on:',
      buttons: [{
        text: 'Facebook',
        role: 'facebook',
        icon: 'logo-facebook',
        handler: () => {
          console.log('Facebook clicked');
        }
      }, {
        text: 'Twitter',
        icon: 'logo-twitter',
        handler: () => {
          console.log('Twitter clicked');
        }
      }, {
        text: 'Google+',
        icon: 'logo-googleplus',
        handler: () => {
          console.log('Google+ clicked');
        }
      }, {
        text: 'Instagram',
        icon: 'logo-instagram',
        handler: () => {
          console.log('Instagram clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  range(n: Array<any>) {
    return new Array(n);
  }

  avgRating() {
    let average = 0;

    this.property.reviews.forEach((val: any, key: any) => {
      average += val.rating;
    });

    return average / this.property.reviews.length;
  }

  // async openCart() {
  //   const modal = await this.modalCtrl.create({
  //     component: CartPage
  //   });
  //   return await modal.present();
  // }

}
