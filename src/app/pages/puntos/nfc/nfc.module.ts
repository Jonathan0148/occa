import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NfcPageRoutingModule } from './nfc-routing.module';

import { NfcPage } from './nfc.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NfcPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [NfcPage]
})
export class NfcPageModule {}
