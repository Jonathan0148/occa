import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacialbasPageRoutingModule } from './facialbas-routing.module';

import { FacialbasPage } from './facialbas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacialbasPageRoutingModule
  ],
  declarations: [FacialbasPage]
})
export class FacialbasPageModule {}
