import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DomoticaPageRoutingModule } from './domotica-routing.module';

import { DomoticaPage } from './domotica.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DomoticaPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [DomoticaPage]
})
export class DomoticaPageModule {}
