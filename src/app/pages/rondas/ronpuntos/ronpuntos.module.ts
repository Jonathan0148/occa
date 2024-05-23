import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { RonpuntosPageRoutingModule } from './ronpuntos-routing.module';

import { RonpuntosPage } from './ronpuntos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RonpuntosPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [RonpuntosPage]
})
export class RonpuntosPageModule {}
