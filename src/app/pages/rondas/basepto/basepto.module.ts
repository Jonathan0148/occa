import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BaseptoPageRoutingModule } from './basepto-routing.module';

import { BaseptoPage } from './basepto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BaseptoPageRoutingModule
  ],
  declarations: [BaseptoPage]
})
export class BaseptoPageModule {}
