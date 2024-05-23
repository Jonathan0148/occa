import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import { PropertyService, TranslateProvider } from '../../providers';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.page.html',
  styleUrls: ['./nearby.page.scss'],
})
export class NearbyPage {
  agmStyles = environment.agmStyles;
  nearProperties: Array<any>;

  constructor(
    public navCtrl: NavController,
    public service: PropertyService,
    private translate: TranslateProvider
  ) {
    this.findAll();
  }

  ionViewWillEnter() {

  }

  findAll() {
    this.service.findAll()
        .then(data => {
          this.nearProperties = data;
        })
        .catch(error => alert(error));
  }

}
