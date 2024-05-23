import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CapdetallePageRoutingModule } from './capdetalle-routing.module';

import { CapdetallePage } from './capdetalle.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CapdetallePageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [CapdetallePage]
})
export class CapdetallePageModule {}
