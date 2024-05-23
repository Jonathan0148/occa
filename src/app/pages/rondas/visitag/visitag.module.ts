import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitagPageRoutingModule } from './visitag-routing.module';

import { VisitagPage } from './visitag.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitagPageRoutingModule
  ],
  declarations: [VisitagPage]
})
export class VisitagPageModule {}
