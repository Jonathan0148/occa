import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FuncionesPageRoutingModule } from './funciones-routing.module';

import { FuncionesPage } from './funciones.page';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FuncionesPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [FuncionesPage]
})
export class FuncionesPageModule {}
