import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerreqPageRoutingModule } from './verreq-routing.module';

import { VerreqPage } from './verreq.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerreqPageRoutingModule
  ],
  declarations: [VerreqPage]
})
export class VerreqPageModule {}
