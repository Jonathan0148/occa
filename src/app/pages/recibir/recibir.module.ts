import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecibirPageRoutingModule } from './recibir-routing.module';

import { RecibirPage } from './recibir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecibirPageRoutingModule
  ],
  declarations: [RecibirPage]
})
export class RecibirPageModule {}
