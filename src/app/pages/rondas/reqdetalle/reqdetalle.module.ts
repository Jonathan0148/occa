import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReqdetallePageRoutingModule } from './reqdetalle-routing.module';

import { ReqdetallePage } from './reqdetalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReqdetallePageRoutingModule
  ],
  declarations: [ReqdetallePage]
})
export class ReqdetallePageModule {}
