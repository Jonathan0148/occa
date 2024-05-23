import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccionPageRoutingModule } from './accion-routing.module';

import { AccionPage } from './accion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AccionPageRoutingModule
  ],
  declarations: [AccionPage]
})
export class AccionPageModule {}
