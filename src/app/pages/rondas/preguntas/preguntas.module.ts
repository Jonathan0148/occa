import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { PreguntasPageRoutingModule } from './preguntas-routing.module';

import { PreguntasPage } from './preguntas.page';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PreguntasPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [PreguntasPage]
})
export class PreguntasPageModule {}
