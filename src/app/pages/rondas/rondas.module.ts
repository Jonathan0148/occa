import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RondasPageRoutingModule } from './rondas-routing.module';


import { RondasPage } from './rondas.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RondasPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [RondasPage]
})
export class RondasPageModule {}
