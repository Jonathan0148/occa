import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PuntosPageRoutingModule } from './puntos-routing.module';

import { PuntosPage } from './puntos.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PuntosPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [PuntosPage]
})
export class PuntosPageModule {}
