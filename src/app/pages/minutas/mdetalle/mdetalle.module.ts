import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SignaturePadModule } from 'angular2-signaturepad';


import { MdetallePageRoutingModule } from './mdetalle-routing.module';

import { MdetallePage } from './mdetalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MdetallePageRoutingModule,
    SignaturePadModule,
    TranslateModule.forChild()
  ],
  declarations: [MdetallePage]
})
export class MdetallePageModule {}
