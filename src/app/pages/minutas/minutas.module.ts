import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinutasPageRoutingModule } from './minutas-routing.module';

import { MinutasPage } from './minutas.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MinutasPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [MinutasPage]
})
export class MinutasPageModule {}
