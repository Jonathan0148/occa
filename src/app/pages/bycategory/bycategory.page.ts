import { Component } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

import { CategoryService, TranslateProvider } from '../../providers';


import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-bycategory',
  templateUrl: './bycategory.page.html',
  styleUrls: ['./bycategory.page.scss'],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(0,10px,0)` }), { optional: true }),
        query(':enter', stagger('300ms', [animate('600ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})
export class BycategoryPage {
  categories: Array<any>;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private service: CategoryService,
    private router: Router
  ) { }

  ionViewWillEnter() {
    this.findAll();
  }

  async openPropertyListPage(cat) {
    const loader = await this.loadingCtrl.create({
      duration: 500
    });

    loader.present();
    loader.onWillDismiss().then(() => {
      let navigationExtras: NavigationExtras = {
        state: {
          cat: cat
        }
      };
      this.router.navigate(['property-list'], navigationExtras);
    });
  }

  findAll() {
    this.service.findAll()
        .then(data => this.categories = data)
        .catch(error => alert(error));
  }
}
