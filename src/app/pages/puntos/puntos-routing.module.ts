import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PuntosPage } from './puntos.page';

const routes: Routes = [
  {
    path: '',
    component: PuntosPage
  },
  {
    path: 'nfc',
    loadChildren: () => import('./nfc/nfc.module').then( m => m.NfcPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PuntosPageRoutingModule {}
