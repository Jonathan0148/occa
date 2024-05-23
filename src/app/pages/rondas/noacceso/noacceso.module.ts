import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoaccesoPageRoutingModule } from './noacceso-routing.module';

import { NoaccesoPage } from './noacceso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NoaccesoPageRoutingModule
  ],
  declarations: [NoaccesoPage]
})
export class NoaccesoPageModule {}
