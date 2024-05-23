import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CapacitacionPageRoutingModule } from './capacitacion-routing.module';

import { CapacitacionPage } from './capacitacion.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CapacitacionPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [CapacitacionPage]
})
export class CapacitacionPageModule {}
